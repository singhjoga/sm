import { OnInit, Component, Input,LOCALE_ID} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'form-error',
  templateUrl: './form-error.html',
  styleUrls: ['./form-error.scss'],
})
export class FormError{
  @Input() 
  messages:string[]=[];

  constructor(private translate:TranslateService ) {
  }
}
