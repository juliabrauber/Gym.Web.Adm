import { 
    Directive, 
    ElementRef, 
    HostListener
} from '@angular/core';

@Directive({
    selector: '[upperCase]'
})
export class UppercaseDirective {
    constructor(
        private el: ElementRef
    ) { }

    @HostListener('keyup') onkeyup() {
        this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
    }
}
