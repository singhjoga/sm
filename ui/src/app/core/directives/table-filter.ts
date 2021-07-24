import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Optional, Renderer2 } from "@angular/core";
@Directive({
  selector: "[table-filter]"
})
export class TableFilterDirective implements OnInit, AfterViewInit{

  constructor(
    public renderer: Renderer2, 
    public elementRef: ElementRef
  ) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let el = this.elementRef;
    console.log("Table filter");
  }
}