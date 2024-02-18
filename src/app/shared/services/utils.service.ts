import { Injectable } from '@angular/core';
import { 
    UntypedFormArray, 
    UntypedFormControl, 
    UntypedFormGroup
} from '@angular/forms';

@Injectable()
export class UtilsService {
    
    constructor() { }

    disableOrEnableFields(form: UntypedFormGroup, exceptList: Array<string> = [], disable: boolean = true): void {
        Object.keys(form.controls).forEach(key => {
            let item = form.controls[key];
            if (item instanceof UntypedFormControl && !exceptList.includes(key)) disable ? item.disable() : item.enable();
            else if (item instanceof UntypedFormGroup) {                
                let fg = (item as UntypedFormGroup);
                Object.keys(fg.controls).forEach(key => {                    
                    disable ? fg.controls[key].disable() : fg.controls[key].enable()
                });
            }
        });
    }

    downloadFile(file: Blob, filename: string) {
        const data = (window.webkitURL || window.URL).createObjectURL(file);
        var link = document.createElement('a');
        link.href = data;
        link.download = filename.replace(/"/g, '');
        link.click();

        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            (window.webkitURL || window.URL).revokeObjectURL(data);
        }, 100);
    }

    getDigits(value: string): string {
        return value.replace(/[^0-9]*/g, '');
    }

    getDiffDays(start: Date, end: Date): number | null {
        if (start && end) {
            let timeDiff = Math.abs(start.getTime() - end.getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }

        return null;
    }

    getDueDate(barCode: string): Date | null {
        if (barCode.startsWith('85')) { //arrecadação õrgãos governamentais
            barCode = barCode.digits();

            const dia = parseInt(barCode.substr(20, 2));
            const mes = parseInt(barCode.substr(22, 1) + barCode.substr(24, 1));
            const ano = parseInt(barCode.substr(25, 2)) + 2000;

            return new Date(ano, mes - 1, dia);
        } else if (!barCode.startsWith('8')) {
            const days = parseInt(barCode.replace(/[^0-9]*/g, '').substr(33, 4));
            if (days > 0) {
                let vencimento = new Date(1997, 10 - 1, 7); // data de inicio da contagem - febraban
                vencimento.setDate(vencimento.getDate() + days);

                return vencimento;
            } else {
                return null;
            }
        }

        return null;
    }

    getTicketAmount(barCode: string): number | null {
        const hoje = new Date();
        barCode = barCode.digits();
        if (barCode.length === 47 || barCode.length === 48) {
            if (barCode.startsWith('8')) {
                // remove os digitos verificadores
                let i = 1;
                const barCodeNoDigits = [];

                Array.from(barCode).forEach(number => {
                    if (i < 12) {
                        barCodeNoDigits.push(number);
                        i++;
                    } else {
                        i = 1;
                    }
                });

                const value = parseFloat(barCodeNoDigits.join('').substring(4, 15));
                return value / 100.0;
            } else {
                const dias = parseInt(barCode.substr(33, 4));
                let vencimento = new Date(1997, 10 - 1, 7); // data de inicio da contagem - febraban
                vencimento.setDate(vencimento.getDate() + dias);

                const value = parseFloat(barCode.substring(37, barCode.length));
                return value / 100.0;
            }
        } else {
            return null;
        }
    }

    getValueBarCode(barCode): string | null {
        if (barCode.startsWith('8')) {//convênio
            // remove os digitos verificadores
            let i = 1;
            const barCodeNoDigits = [];
            Array.from(barCode).forEach(number => {
                if (i < 12) {
                    barCodeNoDigits.push(number);
                    i++;
                } else {
                    i = 1;
                }
            });

            const value = parseFloat(barCodeNoDigits.join('').substring(4, 15)).toString();
            if (value && +value > 0) {
                return this.insert(value, '.', value.length - 2);
            } else {
                return null;
            }
        } else {//boletos, carnes...
            const value = parseFloat(barCode.substring(37, barCode.length)).toString();
            if (value && +value > 0) {
                return this.insert(value, '.', value.length - 2);
            } else {
                return null;
            }
        }
    }

    insert(value, ocorr, pos): string {
        return value.slice(0, pos) + ocorr + value.slice(pos);
    }

    getCardFlag(cardnumber): string {
        if (cardnumber) {
            var cardnumber = cardnumber.replace(/[^0-9]+/g, '');

            var cards = {
                visa: /^4/,
                master: /^5[1-5]/,
                amex: /^3[47][0-9]{13}/,
                hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
                elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
            };

            for (var flag in cards) {
                if (cards[flag].test(cardnumber)) {
                    return flag.toLowerCase();
                }
            }
        }

        return '';
    }
    
    markAllAsTouched(form: UntypedFormGroup): void {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof UntypedFormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof UntypedFormGroup) {
                this.markAllAsTouched(control);
            } else if (control instanceof UntypedFormArray) {
                control.markAsTouched({ onlySelf: true });
                (control as UntypedFormArray).controls.forEach(ctrl => {
                    if (ctrl instanceof UntypedFormControl) {
                        ctrl.markAsTouched({ onlySelf: true });
                    } else if (ctrl instanceof UntypedFormGroup) {
                        this.markAllAsTouched(ctrl);
                    }
                });
            }
        });
    }

    resetForm(form: UntypedFormGroup, excludeCtrls: string[]): void {
        for (let name in form.controls) {
            if (!excludeCtrls.includes(name)) {
                if (form.controls[name] instanceof UntypedFormControl) {
                    (<UntypedFormControl>form.controls[name]).reset();
                }
                else if (form.controls[name] instanceof UntypedFormGroup) {
                    (<UntypedFormGroup>form.controls[name]).reset();
                } else if (form.controls[name] instanceof UntypedFormArray) {
                    (<UntypedFormArray>form.controls[name]).clear();
                }
            }
        }
    }
      
}