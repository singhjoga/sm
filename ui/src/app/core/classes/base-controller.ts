import { TranslateService } from '@ngx-translate/core';
import { AppInjector } from '../injector.module';
import { ErrorResponse } from '@app/01_models/RestResponse';
export abstract class BaseConroller {
    public translate: TranslateService;
    constructor() {
        this.translate = AppInjector.get(TranslateService);
    }

    getLabelText(name:string): string {
        return this.translate.instant('labels.' + name);
    }
    getErrorMessageText(name:string): string {
        return this.translate.instant('errors.' + name);
    }
    getFeatureText(name:string): string {
      return this.translate.instant('features.' + name);
  }
    getMessageText(name:string, obj?:Object): string {
        return this.translate.instant('messages.' + name,obj);
    }
    getApiErrorAsString(error: ErrorResponse) {
        let result:string[] = [error.message];
        if (error.errors) {
          error.errors.forEach(e => {
            let msg ='';
            if (e.field) {
              msg += e.field+': ';
            }
            msg += e.message;
            result.push(msg);
          });
        }
    
        return result;
      }
}