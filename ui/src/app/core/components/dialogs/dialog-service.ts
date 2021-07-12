import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseConroller } from '@app/core/classes/base-controller';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog';

@Injectable({
    providedIn: 'root'
})
export class DialogService extends BaseConroller {
    constructor(private dialog: MatDialog) {
        super();
    }

    public showConfirmationDialog(title: string, msgText: string, okLabel: string, cancelLabel: string): Promise<any> {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            width: '30vw',height:'30vh',panelClass: 'dialog-panel'
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.msgText = msgText;
        dialogRef.componentInstance.okLabel = okLabel;
        dialogRef.componentInstance.cancelLabel = cancelLabel;
        return dialogRef.afterClosed().toPromise();
    }
    public isDeleteOK(itemCount?:number): Promise<any> {
        let msgText = this.getMessageText('delete', {count:itemCount});
        let titleText = this.getLabelText('confirmation');
        return this.isYesNo(titleText,msgText);
    }
    public isYesNo(titleTxt: string, msgTxt: string): Promise<any> {
        let yes = this.getLabelText('yes');
        let no = this.getLabelText('no');
        return this.showConfirmationDialog(titleTxt, msgTxt, yes, no);
    }
    public isOkCancel(titleTxt: string, msgTxt: string): Promise<any> {
        let yes = this.getLabelText('ok');
        let no = this.getLabelText('cancel');
        return this.showConfirmationDialog(titleTxt, msgTxt, yes, no);
    }
    public isConfirmationResultOK(result: string): boolean {
        if (result === 'ok') {
            return true;
        } else {
            return false;
        }
    }

}
