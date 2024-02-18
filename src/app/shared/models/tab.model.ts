export class Tab {
    icon: string;
    name: string;
    title: string;

    constructor(initial?: Partial<Tab>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}