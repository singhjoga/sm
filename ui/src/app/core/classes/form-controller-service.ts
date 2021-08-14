import { DialogMode } from "@app/shared/constants";

export  class FormControllerService {
    private mode: DialogMode;

    constructor() {
        this.mode=DialogMode.View;
    }
    public setMode(mode:DialogMode) {
        this.mode=mode;
    }
    public getMode():DialogMode {
        return this.mode;
    }
}