import { OnInit, AfterViewInit, Component, Input, LOCALE_ID, forwardRef, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormConroller } from '../../../classes/form-controller';
import { AbstractControl } from '@app/core/components/controls/abstract-control';
import { Dropdown } from 'primeng/dropdown';
@Component({
  selector: 'dropdown-control',
  templateUrl: './dropdown-control.html',
  styleUrls: ['./dropdown-control.scss'],
  // viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownControl),
      multi: true
    }
  ]
})
export class DropdownControl extends AbstractControl implements OnInit, ControlValueAccessor {
  @Input()
  controlName!: string;
  @Input()
  controller!: FormConroller<any>;
  @Input()
  placeholder!: string;

  _options!: any[];
  @Input()
  optionLabelField!: string;
  @Input()
  optionValueField!: string;

  @ViewChild('dropdownControl')
  dropdown!: Dropdown
  value!: any;
  _onChangeCallbak = (_: any) => { };
  optionIdValue: any;
  constructor() {
    super();
  }
  @Input() set options(value: any[]) {
    this._options = value;
    this.initValue();
  }
  ngOnInit(): void {
    this.onInit(this.controlName, this.controller);
  }

  initValue() {
    var selectedValue = this._options.find(e => e[this.optionValueField] == this.optionIdValue);
    this.value = selectedValue;
  }
  onValueChange(event) {
    if (this._onChangeCallbak) {
      this._onChangeCallbak(event.value[this.optionValueField]);
    }
  }
  writeValue(value: any): void {
    if (value !== undefined && value) {
      this.optionIdValue = value;
      this.initValue();
    }
  }
  registerOnChange(fn: any): void {
    this._onChangeCallbak = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState(isDisabled: boolean): void {
    this.dropdown.disabled = isDisabled;
  }
}
