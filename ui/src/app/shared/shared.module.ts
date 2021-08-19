import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { AddressInfoControl } from '@app/shared/address/address-details/address.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../shared/primeng.module';
import { AddressListControl } from '@app/shared/address/address-list/address-list.component';
@NgModule({
  declarations: [
    AddressInfoControl,
    AddressListControl
  ],
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  exports: [
    AddressInfoControl,
    AddressListControl
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class SharedModule { 
  
}
