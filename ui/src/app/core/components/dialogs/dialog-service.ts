import { Injectable } from '@angular/core';
import { BaseConroller } from '@app/core/classes/base-controller';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog';
import { ConfigmrationDialogButton} from './constants';
import { DialogService} from 'primeng/dynamicdialog';
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
            width: '30vw',height:'30vh',
            data: {
                title: title,
                msgText: msgText,
                yesLabel: yesLabel,
                cancelLabel: cancelLabel
            }
        });
        return dialogRef.onClose.toPromise();
    }
    public showInfoDialog(title: string, msgText: string): Promise<any> {
        let yes = this.getLabelText('ok');
        const dialogRef = this.ngDialogService.open(ConfirmationDialog, {
            width: '30vw',height:'30vh',
            data: {
                title: title,
                msgText: msgText,
                yesLabel: yes,
                icon: "info"
            }
        });

        return dialogRef.onClose.toPromise();
    }
    public showErrorDialog(title: string, msgText: string): Promise<any> {
        let yes = this.getLabelText('ok');
        const dialogRef = this.ngDialogService.open(ConfirmationDialog, {
            width: '30vw',height:'30vh',
            data: {
                title: title,
                msgText: msgText,
                yesLabel: yes,
                icon: "error",
                iconColor:"warn"
            }
        });
        return dialogRef.onClose.toPromise();
    }

    public isYesNo(titleTxt: string, msgTxt: string): Promise<any> {
        let yes = this.getLabelText('yes');
        let no = this.getLabelText('no');
        return new Promise<any>((resolve) =>{
            this.confirmationService.confirm({
                message: msgTxt,
                key: 'app',
                header: titleTxt,
                icon: 'pi pi-question-circle',
                accept: () =>{
                    resolve(ConfigmrationDialogButton.Yes);
                },
                reject: () =>{
                    resolve(ConfigmrationDialogButton.No);
                }
            });
        });
        //return this.showConfirmationDialog(titleTxt, msgTxt, yes, no);
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
