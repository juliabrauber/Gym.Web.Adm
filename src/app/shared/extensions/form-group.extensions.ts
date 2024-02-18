import { UntypedFormGroup } from '@angular/forms'

declare module '@angular/forms' {
    interface FormGroup {
        markAllAsDirty(this: FormGroup): void;
    }
}

UntypedFormGroup.prototype.markAllAsDirty = function (this: UntypedFormGroup): void {
    for (const i in this.controls) {
        this.controls[i].markAsDirty();
        this.controls[i].updateValueAndValidity();
    }
}