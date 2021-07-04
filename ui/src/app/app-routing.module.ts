import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '@app/02_home/home.component'
const routes: Routes = [
  {path: 'home', component: HomeComponent},
 // {path: 'customers', loadChildren: () => CustomerManagementModule},
  {path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
