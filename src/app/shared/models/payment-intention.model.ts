import { Condition } from "./conditions.model";

export class PaymentIntentionModel {
    amount: number;
    description: string;
    customerName: string;
    customerDocument: string;
    conditions: Array<Condition>;
    token: string;

    constructor(initial?: Partial<PaymentIntentionModel>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}