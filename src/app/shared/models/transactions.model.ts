export class Transactions {
    status: string;
    tid: string;
    date: Date;    

    constructor(initial?: Partial<Transactions>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}