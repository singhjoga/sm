import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Optional, Renderer2 } from "@angular/core";
import { NgControl } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
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
    @Optional() private parentFormField: MatFormField,
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
      if (this.parentFormField && this.parentFormField._elementRef) { // required for Angular Material form-fields
        //this.renderer.setAttribute(this.parentFormField._elementRef.nativeElement, 'required', '');
      }
    }
    console.log("Constructor of number directive");
  }
}