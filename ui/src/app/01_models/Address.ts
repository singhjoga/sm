import { AbstractResource } from "./AbstractResource";

export class Address extends AbstractResource{
  area: string='';
  city: string='';
  countryId: string='';
  houseNo: string='';
  state: string='';
  street: string='';
  zipCode: string='';
  createDate?: Date;
  createUser?: string;
  objectId?: string;
  objectType?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}
