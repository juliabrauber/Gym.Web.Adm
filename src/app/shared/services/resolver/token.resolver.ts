import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { 
    EMPTY, 
    Observable
} from "rxjs";
import { catchError } from "rxjs/operators";

import { Constants } from "../../constants";
import { PaymentIntentionModel } from "../../models/payment-intention.model";
import { errorActions } from "../../store/actions/error.actions";
import { AppState } from "../../store/models/app.state";
import { PaymentService } from "../http/payment.service";

@Injectable()
export class TokenResolver  {
    constructor(
        private router: Router,        
        private paymentService: PaymentService,
        private store: Store<AppState>
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PaymentIntentionModel | Observable<PaymentIntentionModel> | Promise<PaymentIntentionModel> {        
        return this.paymentService.getIntention(route.paramMap.get('token'))
            .pipe(
                catchError((httpError: HttpErrorResponse) => {                    
                    if (httpError.status === 404 || httpError.status === 422) {                        
                        this.store.dispatch(errorActions.trigger({ 
                            code: 500,
                            description: httpError.error.message                            
                          }));

                        this.router.navigate([Constants.routesPath.error]);
                    }

                    return EMPTY;
                })
            );
    }

}