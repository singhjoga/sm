import { OnInit, Component, Input,LOCALE_ID} from '@angular/core';
import { ControlContainer,FormGroupDirective} from '@angular/forms';
import {FormConroller} from '../../../classes/form-controller';
import { AbstractControl } from '@app/core/components/controls/abstract-control';
@Component({
  selector: 'input-control',
  templateUrl: './input-control.html',
  styleUrls: ['./input-control.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputControl extends AbstractControl implements OnInit {
  @Input() 
  controlName!:string;
  @Input() 
  controller!:FormConroller<any>;

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.onInit(this.controlName, this.controller);
  }
}
