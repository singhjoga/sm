
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[resourceDialog]',
})
export class ResourceDialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
