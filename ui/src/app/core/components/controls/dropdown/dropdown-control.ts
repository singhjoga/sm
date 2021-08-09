import { OnInit, AfterViewInit, Component, Input,LOCALE_ID} from '@angular/core';
import { ControlContainer,FormGroupDirective} from '@angular/forms';
import {FormConroller} from '../../../classes/form-controller';
import { CustomFormControl } from '../custom-form-control';
import { AbstractControl } from '@app/core/components/controls/abstract-control';
@Component({
  selector: 'dropdown-control',
  templateUrl: './dropdown-control.html',
  styleUrls: ['./dropdown-control.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DropdownControl extends AbstractControl implements OnInit, AfterViewInit {
  @Input() 
  controlName!:string;
  @Input() 
  controller!:FormConroller<any>;
  @Input() 
  placeholder!:string;
  @Input() 
  options!:any[];
  @Input() 
  optionLabelField!:string;
  @Input() 
  optionValueField!:string;

  control!: CustomFormControl;
  errorMessage:string='';
  required:boolean=false;
  value!: any;
  isUpdating:boolean=false;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.onInit(this.controlName, this.controller);

    this.control.valueChanges.subscribe(() => {
      if (!this.isUpdating) {
        this.initValue();
      }
    })
    this.required=this.getRequired();
  }
  ngAfterViewInit(): void {
 
  }
  initValue() {
    if (this.control.value) {
      var selectedValue = this.options.find(e=>e[this.optionValueField] == this.control.value);
      this.value=selectedValue;
    }
  }
  onValueChange(event) {
    if (this.control && !this.isUpdating && event.value != null) {
      this.isUpdating=true;
      this.control.setValue(event.value[this.optionValueField]);
      this.isUpdating=false;
    }
  }
}
