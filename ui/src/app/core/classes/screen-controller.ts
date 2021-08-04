import { DialogMode } from "@app/shared/constants";
import { BaseConroller } from "./base-controller";
export abstract class ScreenController extends BaseConroller {
    constructor(private screenName:string) {
        super();
    }
    protected getTitle() {
        return this.getFeatureText(this.screenName);
    }
    protected getTitleOfDialog(mode: DialogMode, dialogName:string):string {
        var modeStr = DialogMode[mode].toLowerCase();
        return this.getLabelText(modeStr)+" - "+this.getFeatureText(dialogName);
    }
}