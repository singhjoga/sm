import { DialogMode } from "@app/shared/constants";

export interface ResourceControl {
    id?: string;
    mode?: DialogMode;
    data?: any;
    save():Promise<any>;
}