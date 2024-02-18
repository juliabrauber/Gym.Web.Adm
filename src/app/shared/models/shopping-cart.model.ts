export class ShoppingCart {
    description: string;
    amount: number;
    value: number;
    total: number;

    constructor(initial?: Partial<ShoppingCart>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}