import { Injectable } from '@angular/core';
import { BaseConroller } from '@app/core/classes/base-controller';
import {MessageService} from 'primeng/api';

@Injectable()
export class SnackbarService extends BaseConroller{
    constructor(private messageService: MessageService) {
        super();
     }
    showSuccess(message: string) {
        this.messageService.add({severity:'success', summary: this.getLabelText('success'), detail: message});
    }
    showError(message: string) {
        this.messageService.add({severity:'error', summary: this.getLabelText('error'), detail: message});
    }
    showInfo(message: string) {
        this.messageService.add({severity:'info', summary: this.getLabelText('information'), detail: message});
    }
}
