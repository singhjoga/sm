import { AbstractResource } from "./AbstractResource";

export class Customer extends AbstractResource{
  email: string='';
  firstName: string='';
  lastName: string='';
  mobile: string='';
  phone: string='';
  languageId: string='';
  sexType: string='';
  birthDate?: Date;
}