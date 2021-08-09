import { Injectable } from '@angular/core';
import { BaseConroller } from '@app/core/classes/base-controller';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog';
import { ConfigmrationDialogButton } from './constants';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
@Injectable({
    providedIn: 'root'
})
export class DialogUtil extends BaseConroller {
    constructor(private ngDialogService: DialogService,
        private confirmationService: ConfirmationService) {
        super();
    }

    public showConfirmationDialog(title: string, msgText: string, yesLabel: string, cancelLabel: string): Promise<any> {

        const dialogRef = this.ngDialogService.open(ConfirmationDialog, {
            width: '30vw', height: '30vh',
            header: title,
            data: {
                msgText: msgText,
                yesLabel: yesLabel,
                cancelLabel: cancelLabel
            }
        });
        return dialogRef.onClose.toPromise();
    }
    public showInfoDialog(title: string, msgText: string): Promise<any> {
        let yes = this.getLabelText('ok');
        return this.showMessage(title, msgText, yes, "pi-info-circle", "color-info");
    }
    public showErrorDialog(title: string, msgText: string): Promise<any> {
        let yes = this.getLabelText('ok');
        return this.showMessage(title, msgText, yes, "pi-times-circle", "color-danger");
    }
    public showSuccessDialog(title: string, msgText: string): Promise<any> {
        let yes = this.getLabelText('ok');
        return this.showMessage(title, msgText, yes, "pi-check-circle", "color-success");
    }
    public showWarningDialog(title: string, msgText: string): Promise<any> {
        let yes = this.getLabelText('ok');
        return this.showMessage(title, msgText, yes, "pi-exclamation-triangle", "color-warning");
    }
    public showMessage(title: string, msgText: string, yesLabel: string, icon: string, iconColor: string, noLabel: string = '', cancelLabel: string = ''): Promise<any> {
        return new Promise<any>((resolve) => {
            const dialogRef = this.ngDialogService.open(ConfirmationDialog, {
                width: '30vw',
                header: title,
                data: {
                    msgText: msgText,
                    yesLabel: yesLabel,
                    icon: icon,
                    iconColor: iconColor,
                    noLabel: noLabel,
                    cancelLabel: cancelLabel
                }
            });
            return dialogRef.onClose.subscribe(result=> {
                resolve(result);
            })
        });
    }

    public isYesNo(titleTxt: string, msgTxt: string): Promise < any > {
    let yes = this.getLabelText('yes');
    let no = this.getLabelText('no');
    return this.showMessage(titleTxt, msgTxt, yes, "pi-question-circle", "color-success", no);
}
    public isOkCancel(titleTxt: string, msgTxt: string): Promise < any > {
    let yes = this.getLabelText('ok');
    let no = this.getLabelText('cancel');
    return this.showMessage(titleTxt, msgTxt, yes, "pi-question-circle", "color-success", '', no);
}
    public isConfirmationResultYes(button: ConfigmrationDialogButton): boolean {
    return button === ConfigmrationDialogButton.Yes;
}

}
