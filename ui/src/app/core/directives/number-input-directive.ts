import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Optional, Renderer2 } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[validator]"
})
export class NumericDirective implements OnInit, AfterViewInit{
  @Input("decimals") decimals: number = 0;
  @Input("negative") negative: number = 0;
  @Input("separator") separator: string = ".";
  @Input("min") min: string|null = null;
  @Input("max") max: string|null = null;

  regExp : RegExp = new RegExp('');
  oldValue: number|null=null;
  constructor(
    private formControl: NgControl, 
    public renderer: Renderer2, 
    public elementRef: ElementRef
  ) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let ctlName:string = this.formControl.name?this.formControl.name.toString():'';
    let ele = this.elementRef;
    let ctl = this.formControl.control?.parent?.controls[ctlName];
    let validator = ctl.validator(ctl);
    if (validator && validator.required) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'required', '');

    }
    console.log("Constructor of number directive");
  }
}