import { Address } from "cluster";
import { ConditionFilter } from "./condition-filter.model";
import { Customer } from "./customer.model";
import { Order } from "./order.model";

export class PaymentIntentionRequest {
    amount: number;
    order: Order;
    capture: boolean;
    expiresAt: Date;
    customer: Customer;
    address: Address;
    conditions: Array<ConditionFilter>;
}