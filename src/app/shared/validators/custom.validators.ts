import { 
    AbstractControl, 
    Validators, 
    ValidatorFn, 
    ValidationErrors 
} from '@angular/forms';
import * as moment from 'moment';

export class CustomValidators extends Validators {
    static board(ifIsset: boolean = false): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value) {
                const er = /\w{3}-\d[\d\w]\d{2}/gi;
                if (!er.test(control.value)) {
                    return { invalid: true };
                } 
                else {
                    return null;
                }
            } 
            else {
                if (ifIsset) {
                    return null;
                }

                return { invalid: true };
            }
        };
    }

    static creditCardFlag(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
            return null;
        }

        var cardNumber = control.value.replace(/[^0-9]+/g, '');

        var cards = {
            visa: /^4/, ///^4[0-9]{12}(?:[0-9]{3})/,
            mastercard: /^5[1-5]/, ///^5[1-5][0-9]{14}/,
            // diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
            amex: /^3[47][0-9]{13}/,
            // discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
            hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
            elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
            // jcb: /^(?:2131|1800|35\d{3})\d{11}/,
            // aura: /^(5078\d{2})(\d{2})(\d{11})$/
        };

        for (var item in cards) {
            if (cards[item].test(cardNumber)) {
                return null;
            }
        }

        return { invalidCardFlag: true };
    }

    static cpf(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
            return null;
        }

        const cpf = control.value.replace(/[^\d]+/g, '');

        switch (cpf) {
            case cpf.length !== 11:
            case '00000000000':
            case '11111111111':
            case '22222222222':
            case '33333333333':
            case '44444444444':
            case '55555555555':
            case '66666666666':
            case '77777777777':
            case '88888888888':
            case '99999999999': {
                return { invalid: true };
            }
        }

        let add = 0;
        for (let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i), 10) * (10 - i);
        }

        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(9), 10)) {
            return { invalid: true };
        }

        add = 0;
        for (let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i), 10) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }

        if (rev !== parseInt(cpf.charAt(10), 10)) {
            return { invalid: true };
        }

        return null;
    }

    static cnpj(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
            return null;
        }

        const cnpj = control.value.replace(/[^\d]+/g, '');

        if (!cnpj) {
            return { invalid: true };
        }

        switch (cnpj) {
            case cnpj.length !== 14:
            case '00000000000000':
            case '11111111111111':
            case '22222222222222':
            case '33333333333333':
            case '44444444444444':
            case '55555555555555':
            case '66666666666666':
            case '77777777777777':
            case '88888888888888':
            case '99999999999999': {
                return { invalid: true };
            }
        }

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return { invalid: true };
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return { invalid: true };
        }

        return null;
    }

    static cpfCnpj(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
            return null;
        }

        const cpf = control.value.replace(/[^\d]+/g, '');
        const cnpj = control.value.replace(/[^\d]+/g, '');

        if (cpf.length <= 11) {
            switch (cpf) {
                case cpf.length !== 11:
                case '00000000000':
                case '11111111111':
                case '22222222222':
                case '33333333333':
                case '44444444444':
                case '55555555555':
                case '66666666666':
                case '77777777777':
                case '88888888888':
                case '99999999999': {
                    return { invalidCpfCnpj: true };
                }
            }

            let add = 0;
            for (let i = 0; i < 9; i++) {
                add += parseInt(cpf.charAt(i), 10) * (10 - i);
            }

            let rev = 11 - (add % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(cpf.charAt(9), 10)) {
                return { invalidCpfCnpj: true };
            }

            add = 0;
            for (let i = 0; i < 10; i++) {
                add += parseInt(cpf.charAt(i), 10) * (11 - i);
            }
            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }

            if (rev !== parseInt(cpf.charAt(10), 10)) {
                return { invalidCpfCnpj: true };
            }

            return null;
        } else {
            switch (cnpj) {
                case cnpj.length !== 14:
                case '00000000000000':
                case '11111111111111':
                case '22222222222222':
                case '33333333333333':
                case '44444444444444':
                case '55555555555555':
                case '66666666666666':
                case '77777777777777':
                case '88888888888888':
                case '99999999999999': {
                    return { invalidCpfCnpj: true };
                }
            }

            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            const digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(0), 10)) {
                return { invalidCpfCnpj: true };
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(1), 10)) {
                return { invalidCpfCnpj: true };
            }

            return null;
        }
    }

    static data(ifIsset: boolean = false): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value) {
                if (typeof control.value !== 'string') {
                    return null;
                }
                const er = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;

                if (!er.test(control.value) || control.value === '') {
                    return { invalid: true };
                } else {
                    return null;
                }
            } 
            else {
                if (ifIsset) {
                    return null;
                }

                return { invalid: true };
            }
        };
    }

    static number(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value) {
            const value = control.value.replace(/[0-9]/g, '');
            if (value.length > 0) {
                return { invalid: true };
            } 
            else {
                return null;
            }
        } 
        else {
            return { invalid: true };
        }
    }

    static isValidCardNumber(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
            return null;
        }

        var cardNumber = control.value.replace(/[^0-9]+/g, '');

        var cards = {
            visa: /^4[0-9]{12}(?:[0-9]{3})/,
            mastercard: /^5[1-5][0-9]{14}/,
            //diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
            amex: /^3[47][0-9]{13}/,
            //discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
            hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
            elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
            //jcb: /^(?:2131|1800|35\d{3})\d{11}/,
            //aura: /^(5078\d{2})(\d{2})(\d{11})$/
        };

        for (var item in cards) {
            if (cards[item].test(cardNumber)) {
                return null;
            }
        }

        return { invalidCardNumber: true };
    }

    static password(control: AbstractControl): { [key: string]: boolean } | null {
        let alpha = /[a-zá-ú]{1,}/gi;
        let number = /[0-9]{1,}/g;
        if (control.value
            && control.value.length >= 7
            && control.value !== '102030'
            && control.value !== '123456'
            && alpha.test(control.value)
            && number.test(control.value)) {
            return null;
        } 
        else {
            return { invalid: true, password: true };
        }
    }

    static creditCardExiry(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }

        var date = control.value as string;
        var values = date.split('/');

        if (values.length !== 2) {
            return {
                invalidCreditCardExiryFormat: true
            };
        }

        let p1 = values[0];
        let p2 = values[1];

        if (p1.length !== 2 || p2.length !== 4) {
            return {
                invalidCreditCardExiryFormat: true
            };
        }

        let m = moment(`01/${p1}/${p2}`, 'DD/MM/YYYY');

        if (!m.isValid()) {
            return {
                invalidCreditCardExiryFormat: true
            };
        }

        if (m.endOf('month').isSameOrAfter(moment(), 'day')) {
            return null;
        }
        else {
            return {
                invalidCreditCardExiry: true
            };
        }
    }

    static phone(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value) {
            const value = control.value.replace(/[^0-9]*/g, '');
            if (value.length < 10
                || value === '00000000000'
                || value === '11111111111'
                || value === '22222222222'
                || value === '33333333333'
                || value === '44444444444'
                || value === '55555555555'
                || value === '66666666666'
                || value === '77777777777'
                || value === '88888888888'
                || value === '99999999999') {
                return { invalid: true };
            } 
            else {
                return null;
            }
        } 
        else {
            return { invalid: true };
        }
    }

    static renavam(ifIsset: boolean = false): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value) {
                const er = /\d{11}/gi;
                if (!er.test(control.value)) {
                    return { invalid: true };
                } else {
                    return null;
                }
            } 
            else {
                if (ifIsset) {
                    return null;
                }

                return { invalid: true };
            }
        };
    }

    static ticket(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value) {
            const value = control.value.replace(/[^\d]+/g, '');
            const er = /\d{48}/gi;
            if (!er.test(value)) {
                return { invalid: true };
            } 
            else {
                return null;
            }
        } 
        else {
            return { invalid: true };
        }
    }

    static url(control: AbstractControl): { [key: string]: boolean } | null {
        const pattern = new RegExp(['^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)',
            '*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm'].join());
        if (!pattern.test(control.value)) {
            return { invalid: true };
        } 
        else {
            return null;
        }
    }

    static minDate(date: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value == null) {
                return null;
            }

            const controlDate = moment(control.value);

            if (!controlDate.isValid()) {
                return null;
            }

            const strContorlDate = controlDate.format();
            const strValidationDate = moment(date).format();

            if (moment(strContorlDate).isSameOrAfter(moment(strValidationDate), 'day')) {
                return null;
            }
            else {
                return {
                    minDate: {
                        date: moment(date).format('DD/MM/YYYY')
                    }
                };
            }
        }
    }
}
