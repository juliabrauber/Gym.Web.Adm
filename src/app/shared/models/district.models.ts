export class District {
    districtCode: string;
    name: string;
    value: number;

    constructor(initial?: Partial<District>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}