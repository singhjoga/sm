import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { AddressInfoControl } from '@app/shared/address/address-details/address.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AddressInfoControl
  ],
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddressInfoControl
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class SharedModule { 
  
}
