import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appUserListService]'
})
export class UserListServiceDirective {

  constructor(renderer: Renderer, el: ElementRef) { 
  	renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gold');
  }

}
