import { AbstractResource } from "@app/01_models/AbstractResource";
import { Address } from "@app/01_models/Address";
import { Customer } from "@app/01_models/Customer";

export class CustomerWithAddress extends AbstractResource{
    customer?: Customer;
    address?: Address
}