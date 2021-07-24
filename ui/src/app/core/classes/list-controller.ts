import { BaseConroller } from "./base-controller";
import {DialogService} from '../components/dialogs/dialog-service';
import { AppInjector } from '../injector.module';
export abstract class ListController extends BaseConroller {
    public dialogService: DialogService;
    constructor() {
        super();
        this.dialogService = AppInjector.get(DialogService);
    }
    public askIsDeleteOK(itemCount?:number): Promise<any> {
        let msgText = this.getMessageText('delete', {count:itemCount});
        let titleText = this.getLabelText('confirmation');
        return this.dialogService.isYesNo(titleText,msgText);
    }
    public showDeleteSuccessful(itemCount?:number): Promise<any> {
        let msgText = this.getMessageText('delete-success', {count:itemCount});
        let titleText = this.getLabelText('information');
        return this.dialogService.showInfoDialog(titleText,msgText);
    }
    public showDeleteFailed(error:String,successItemCount?:number): Promise<any> {
        let msgText = this.getMessageText('delete-failed', {error: error,count:successItemCount});
        let titleText = this.getLabelText('error');
        return this.dialogService.showErrorDialog(titleText,msgText);
    }
}