import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { CreditCardPaymentRequest } from "../../models/credit-card-payment-request.model";
import { CreditCardPaymentResponse } from "../../models/credit-card-payment-response";
import { LinkPaymentRequest } from "../../models/link-payment-request.model";
import { PaymentIntentionModel } from "../../models/payment-intention.model";
import { PaymentLinkResponse } from "../../models/payment-link-response.model";
import { PaymentSlipRequest } from "../../models/payment-slip-request.model";
import { BaseService } from "./base.service";

@Injectable()
export class PaymentService extends BaseService{
    getApiEndpoint(): string {
        return environment.serviceUrl + '/api/payment';
    }

    createLink(token: string, model: LinkPaymentRequest): Observable<PaymentLinkResponse> {
        return this.http.post<PaymentLinkResponse>(this.buildPath(`/${token}/create-link`), model)
            .pipe(take(1));
    }

    creditCardPay(token: string, model: CreditCardPaymentRequest): Observable<CreditCardPaymentResponse> {
        return this.http.post<CreditCardPaymentResponse>(this.buildPath(`/${token}/credit-card/pay`), model)
            .pipe(take(1));
    }

    getIntention(token: string): Observable<PaymentIntentionModel> {
        return this.http.get<PaymentIntentionModel>(this.buildPath(`/${token}/intention`))
            .pipe(take(1));
    }

    paymentSlip(token: string, model: PaymentSlipRequest): Observable<boolean> {
        return this.http.post<boolean>(this.buildPath(`/${token}/pay-slip`), model)
            .pipe(take(1));                    
    }
}