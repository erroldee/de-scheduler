import {Directive, OnInit, Input, ElementRef} from '@angular/core';
import * as $ from 'jquery';

@Directive({
    selector: '[show-on-scroll]'
})
export class ShowOnScrollDirective implements OnInit {
    @Input('show-on-scroll') showFabButton: string;
    pxBeforeShow = 100;

    constructor(
        private elementRef: ElementRef
    ) {}

    ngOnInit(): any {
        const self = this;

        $('#' + self.showFabButton).hide();

        $(self.elementRef.nativeElement).find('div.scroll-content').on('scroll', () => {
            if ($(self.elementRef.nativeElement).find('div.scroll-content').scrollTop() > self.pxBeforeShow) {
                $('#' + self.showFabButton).show();
            } else {
                $('#' + self.showFabButton).hide();
            }
        });
    }
}
