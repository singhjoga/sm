import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from './00_navigation/navigation.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {TranslateModule} from '@ngx-translate/core';
import { PrimengModule } from './shared/primeng.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { CustomerManagementModule } from './customer-management/customer-management.module'
import { HomeComponent } from './02_home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from '@app/system/system.module';
//import { FlexLayoutModule } from '@angular/flex-layout'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    PrimengModule,
    BrowserModule,
    CoreModule,
    NavigationModule,
    BrowserAnimationsModule,
  //  TranslateModule,
    LayoutModule,
    HttpClientModule,
    CustomerManagementModule,
    AppRoutingModule,
    SystemModule
   // FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
