import { 
    Pipe, 
    PipeTransform
} from '@angular/core';
import { 
    DomSanitizer, 
    SafeHtml
} from '@angular/platform-browser';

import '../extensions/string.extension';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) { }

    transform(value: string, args: string, digits: boolean, uppercase: boolean = false): string | SafeHtml {
        if (value) {
            if (digits && args) {
                args = args.digits();
            }

            let result: string;
            const re = new RegExp(args, 'gi');
            value = value.replace(re, `<strong style="background-color: #fadb14">${args}</strong>`);
            if (uppercase) {
                result = value.toUpperCase();
            } else {
                result = value;
            }

            return this.domSanitizer.bypassSecurityTrustHtml(result);
        }
        
        return value;
    }
}