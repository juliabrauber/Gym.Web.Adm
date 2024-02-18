import { CreditCard } from "./credit-card.model";

export class CreditCardPaymentRequest {
    idenCondPagm: number;
    installments: number;
    creditCard: CreditCard;
}