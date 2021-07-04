import { Component } from '@angular/core';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  constructor(translate: TranslateService) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('firstName').subscribe(value => {
        console.log("Language change loaded. Value="+value);
      })
    });
    translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('firstName').subscribe(value => {
        console.log("Default Language change. Value="+value);
      })
    });
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
}
}
