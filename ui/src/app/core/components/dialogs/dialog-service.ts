import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseConroller } from '@app/core/classes/base-controller';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog';
import { ConfigmrationDialogButton} from './constants';
@Injectable({
    providedIn: 'root'
})
export class DialogService extends BaseConroller {
    constructor(private dialog: MatDialog) {
        super();
    }

    public showConfirmationDialog(title: string, msgText: string, yesLabel: string, cancelLabel: string): Promise<any> {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            width: '30vw',height:'30vh',panelClass: 'dialog-panel'
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.msgText = msgText;
        dialogRef.componentInstance.yesLabel = yesLabel;
        dialogRef.componentInstance.cancelLabel = cancelLabel;
        return dialogRef.afterClosed().toPromise();
    }
    public showInfoDialog(title: string, msgText: string): Promise<any> {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            width: '30vw',height:'30vh',panelClass: 'dialog-panel'
        });
        let yes = this.getLabelText('ok');
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.msgText = msgText;
        dialogRef.componentInstance.yesLabel = yes;
        dialogRef.componentInstance.icon="info";

        return dialogRef.afterClosed().toPromise();
    }
    public showErrorDialog(title: string, msgText: string): Promise<any> {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            width: '30vw',height:'30vh',panelClass: 'dialog-panel'
        });
        let yes = this.getLabelText('ok');
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.msgText = msgText;
        dialogRef.componentInstance.yesLabel = yes;
        dialogRef.componentInstance.icon="error";
        dialogRef.componentInstance.iconColor="warn";

        return dialogRef.afterClosed().toPromise();
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
    public isConfirmationResultYes(button:ConfigmrationDialogButton): boolean {
       return button === ConfigmrationDialogButton.Yes;
    }

}
