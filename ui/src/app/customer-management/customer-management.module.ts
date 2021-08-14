import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { PrimengModule } from '../shared/primeng.module';
import { CustomerManagementComponent} from './list/customer-management.component'
import { CustomerDetailsComponent} from './details/customer-details.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerBasicInfoComponent } from '@app/customer-management/details/basic-info/customer-basic-info.component';
import { SharedModule } from '@app/shared/shared.module';
//import {TranslateModule} from '@ngx-translate/core';
const routes: Routes = [
  { path: 'customers',  component: CustomerManagementComponent}
];

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerDetailsComponent,
    CustomerBasicInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    PrimengModule,
    FlexLayoutModule,
    SharedModule
    //TranslateModule
  ],
  exports: [
 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class CustomerManagementModule { 
  
}
