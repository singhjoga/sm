import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() { }

    isValidJson(text: any):boolean {
        try {
            JSON.parse(text);
            return true;
        } catch(err) {
           return false;
        }
    }
}
