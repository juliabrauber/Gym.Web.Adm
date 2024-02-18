import { Injectable } from '@angular/core';
import { 
    HttpEvent, 
    HttpHandler, 
    HttpInterceptor, 
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {    

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {           
        let credentials = `${environment.oauth.basicAuthentication.username}:${environment.oauth.basicAuthentication.password}`;
        let base64Credentials = window.btoa(credentials);

        req = req.clone({
            setHeaders: {
                Authorization: `Basic ${base64Credentials}`
            }
        });

        return next.handle(req);        
    }

}