import { Injectable } from '@angular/core';
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpEvent, 
    HttpErrorResponse 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Constants } from '../constants';

@Injectable()
export class AlertHttpErrorInterceptor implements HttpInterceptor {

  constructor(    
    private modal: NzModalService    
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    return next.handle(req)
      .pipe(
        tap(
          event => { },
          (err: any) => {                        
            if (err instanceof HttpErrorResponse) {              
              if (err.status === 401) {
                this.modal.closeAll();

                this.modal.error({
                  nzTitle: 'Erro ao tentar se autenticar',                  
                  nzContent: `
                    Tente novamente, caso o erro persista entre em contato como administrador do sistema!                  
                  `
                });
              }
              else if (err.status === 422) {
                let msg = err.error?.message || Constants.defaultErrorMessage;
                
                this.modal.warning({
                  nzTitle: 'Atenção',                  
                  nzContent: msg
                });
              }
              else {
                if (req.headers.has(Constants.headerKeyIgnoreError)) {
                  return;
                }

                this.modal.closeAll();

                this.modal.error({
                  nzTitle: 'Erro ao processar requisição',                  
                  nzContent: `
                  Tente novamente, caso o erro persista entre em contato como administrador do sistema!
                  <hr class="mb-3 mt-3">
                  <strong>Error</strong>: ${err.message}
                  <br>
                  <br>
                  <strong>Status</strong>: ${err.statusText}
                  `
                });
              }
            }
          }
        )
      );
  }
}