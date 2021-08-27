import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { PrimengModule } from '../shared/primeng.module';
import { CustomerManagementComponent} from './customer-management/list/customer-management.component'
import { CustomerDetailsComponent} from './customer-management/details/customer-details.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerBasicInfoComponent } from '@app/features/customer-management/details/basic-info/customer-basic-info.component';
import { SharedModule } from '@app/shared/shared.module';
import { ResourceDialogComponent } from '@app/features/resource-dialog/resource-dialog.component';
import { ResourceDialogDirective } from '@app/features/resource-dialog/resource-dialog-directive';
import { DhabaManagementComponent } from './dhaba-management/list/dhaba-management.component';
import { DhabaBasicInfoComponent } from './dhaba-management/details/basic-info/dhaba-basic-info.component';
import { DhabaDetailsComponent } from './dhaba-management/details/dhaba-details.component';
//import {TranslateModule} from '@ngx-translate/core';
const routes: Routes = [
  { path: 'customers',  component: CustomerManagementComponent},
  { path: 'dhabas',  component: DhabaManagementComponent}
];

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerDetailsComponent,
    CustomerBasicInfoComponent,
    ResourceDialogComponent,
    ResourceDialogDirective,
    DhabaManagementComponent,
    DhabaBasicInfoComponent,
    DhabaDetailsComponent
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
