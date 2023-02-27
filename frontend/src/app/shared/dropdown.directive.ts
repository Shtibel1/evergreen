import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false 

    constructor(private elRef:ElementRef, private renderer: Renderer2) {}

    @HostListener('document:click', ['$event']) click(eventData: Event) {
        this.isOpen = this.elRef.nativeElement.contains(eventData.target) ? !this.isOpen : false 
    }
}