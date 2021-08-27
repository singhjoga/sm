import { AbstractResource } from "./AbstractResource";
import { Address } from "./Address";

export class Dhaba extends AbstractResource{
  name: string='';
  orderEmail: string='';
  orderPhone: string='';
  TaxNo: string='';
  deliverySelf: boolean=false;
  deliveryPickup: boolean=false;
  deliveryDineIn: boolean=false;
  delivery3rdParty: boolean=false;
  addresses: Address[]=[];
}