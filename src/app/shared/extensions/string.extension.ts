import { FormGroup } from '@angular/forms'

declare global {
    interface String {
        digits(this: string): string;
    }
}

String.prototype.digits = function (this: string): string {
    return this.replace(/[^0-9]*/g, '');
}