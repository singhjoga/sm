export enum DialogMode {
    Add,
    Edit,
    View
}
export enum CommonFields {
    CreateDate='createDate',
    CreateUser='createUser',
    IsDisabled='isDisabled'
}
export class Constants {
    public static inst: Constants = new Constants();
    readonly CUSTOMER_DETAILS="customerDetails";
    readonly CUSTOMER_LIST="customerList";
}