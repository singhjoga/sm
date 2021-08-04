import { NgModule} from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { SystemService } from '@app/system/system-service';

@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
  ],
  exports: [
 
  ],
  providers: [
    SystemService
  ]
})
export class SystemModule { 
  
}
