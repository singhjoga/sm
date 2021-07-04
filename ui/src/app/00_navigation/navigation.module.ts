import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import {CustomerManagementModule} from '@app/customer-management/customer-management.module';
import {HomeComponent} from '@app/02_home/home.component'
const routes: Routes = [
  {path: 'home', component: HomeComponent},
 // {path: 'customers', loadChildren: () => CustomerManagementModule},
  {path: '',   redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  declarations: [  
    NavigationComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    CommonModule,
    CustomerManagementModule
  ],
  exports: [NavigationComponent],
})
export class NavigationModule { }
