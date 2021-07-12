import { NgModule, Injector } from '@angular/core';
export let AppInjector: Injector;
@NgModule({ 
 
})
export class InjectorModule { 
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
