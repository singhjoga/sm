import { OnInit, Component, Input,LOCALE_ID} from '@angular/core';
import { ControlContainer,FormGroupDirective} from '@angular/forms';
import {FormConroller} from '../../../classes/form-controller';
import { AbstractControl } from '@app/core/components/controls/abstract-control';
@Component({
  selector: 'datepicker-control',
  templateUrl: './datepicker-control.html',
  styleUrls: ['./datepicker-control.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DatePickerControl extends AbstractControl implements OnInit {
  @Input() 
  controlName!:string;
  @Input() 
  controller!:FormConroller<any>;
  @Input() 
  yearRange:string="1920:2050";
  @Input() 
  dateFormat:string="dd.mm.yy";

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.onInit(this.controlName, this.controller);
  }
}
