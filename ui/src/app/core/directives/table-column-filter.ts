import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Optional, Renderer2 } from "@angular/core";
@Directive({
  selector: "[table-column-filter]"
})
export class TableColumnFilterDirective implements OnInit, AfterViewInit{

  constructor(
    public renderer: Renderer2, 
    public elementRef: ElementRef
  ) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let el = this.elementRef;
    const div = this.renderer.createElement('div');
    this.renderer.setStyle(div,"display","flex");
    this.renderer.appendChild(div, this.elementRef.nativeElement.firstChild.cloneNode(true));
   // this.renderer.removeChild(this.elementRef.nativeElement,this.elementRef.nativeElement.firstChild);
    this.renderer.setStyle(this.elementRef.nativeElement,"white-space","nowrap");
    const icon = this.renderer.createElement('mat-icon');
    this.renderer.appendChild(icon, this.renderer.createText('filter_alt'));
    this.renderer.addClass(icon, 'mat-icon');
    this.renderer.addClass(icon, 'material-icons');
    this.renderer.appendChild(div, icon);
    if (this.elementRef.nativeElement) {
      this.renderer.appendChild(this.elementRef.nativeElement, icon);
    }
   // this.renderer.appendChild(this.elementRef.nativeElement, div);
  //  let div = this.renderer.selectRootElement('ul.ddl>li.active', true);
    console.log("Column filter");
  }
}