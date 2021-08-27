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
    readonly DIALOG_CLOSE="close";
    readonly ADDRESS_DETAILS="addressDetails";
    readonly ADDRESS_LIST="addressList";
    readonly DHABA_DETAILS="dhabaDetails";
    readonly DHABA_LIST="dhabaList";
    readonly OBJECT_TYPE_CUSTOMER_CODE="cust";
    readonly OBJECT_TYPE_CUSTOMER="customer";
    readonly OBJECT_TYPE_ADDRESS_CODE="addr";
    readonly OBJECT_TYPE_ADDRESS="address";
    readonly OBJECT_TYPE_DHABA_CODE="dhaba";
    readonly OBJECT_TYPE_DHABA="dhabas";
}