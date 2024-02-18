import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { cpfValidator } from 'src/app/shared/directives/cpf-validator.directive';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.less']
})
export class RegisterUserComponent implements OnInit  {

  formGroup: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    phoneNumber: FormControl<string>;
    cpf: FormControl<string>;
  }>;

constructor(private formBuilder: FormBuilder){  }


  ngOnInit(): void {
    this.createFormBuilder();
  }

  private createFormBuilder = async () => {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      phoneNumber: ['', [Validators.required]],
      cpf: ['', [cpfValidator()]]  
    });
  }

  public submitForm = (): void  => {
    if (this.formGroup.valid) {
      console.log('submit', this.formGroup.value);
    } else {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public updateConfirmValidator = (): void  => {
    Promise.resolve().then(() => this.formGroup.controls.checkPassword.updateValueAndValidity());
  }

  public confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.formGroup.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}
