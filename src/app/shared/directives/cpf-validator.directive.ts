import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value.length !== 11){
            return null;
        }
        let valid = true;
        let cpf = control.value;
        
        cpf = cpf.replace(/\D/g, '');
        if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)){
            valid = false;
        } 

        [9, 10].forEach(function (j) {
            var soma = 0, r;
            cpf.split(/(?=)/).splice(0, j).forEach(function (e: string, i: number) {
                soma += parseInt(e) * ((j + 2) - (i + 1));
            });
            r = soma % 11;
            r = (r < 2) ? 0 : 11 - r;
            if (r != cpf.substring(j, j + 1)) valid = false;
        });

        return !valid ? { cpfValidator: true } : null;
    };
}
