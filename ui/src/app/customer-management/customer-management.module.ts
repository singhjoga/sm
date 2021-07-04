import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { CustomerManagementComponent} from './list/customer-management.component'
import { CustomerDetailsComponent} from './details/customer-details.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
//import {TranslateModule} from '@ngx-translate/core';
const routes: Routes = [
  { path: 'customers',  component: CustomerManagementComponent}
];

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    AngularMaterialModule,
    MatPaginatorModule,
    FlexLayoutModule,
    //TranslateModule
  ],
  exports: [
 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class CustomerManagementModule { 
  
}
