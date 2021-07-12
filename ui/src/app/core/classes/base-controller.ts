import { TranslateService } from '@ngx-translate/core';
import { AppInjector } from '../injector.module';
export abstract class BaseConroller {
    private translate: TranslateService;
    constructor() {
        this.translate = AppInjector.get(TranslateService);
    }

    getLabelText(name:string): string {
        return this.translate.instant('labels.' + name);
    }
    getErrorMessageText(name:string): string {
        return this.translate.instant('errors.' + name);
    }
    getMessageText(name:string, obj?:Object): string {
        return this.translate.instant('messages.' + name,obj);
    }
}