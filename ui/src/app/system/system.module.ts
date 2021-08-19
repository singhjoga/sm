import {NgModule} from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { SystemService } from '@app/system/system-service';
import { Settings } from './Settings';

@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
  ],
  exports: [
 
  ],
  providers: [
  SystemService,
  Settings]
})
export class SystemModule { 
  
}
