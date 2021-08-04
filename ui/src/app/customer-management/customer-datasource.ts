import {Customer} from '@app/01_models/Customer';
import {CustomerService} from './customer.service';
import { LazyLoadEvent } from 'primeng/api';

export class CustomerDataSource{
  allData: Customer[]=[];
  pageData: Customer[] = [];
  sortedData?: Customer[];
  loading: boolean=false;
  lastLoadEvent: LazyLoadEvent|undefined;
  constructor(private service: CustomerService) {
    this.refresh();
  }

  public refresh():Promise<void> {
    return new Promise<void>((resolve,reject)=> {
      setTimeout(()=> {
        this.service.findAll().then(resp => {
          this.allData=resp;
          if (!this.lastLoadEvent) {
            this.pageData=[];
          }else{
            this.lazyLoad(this.lastLoadEvent);
          }
          resolve();
        })
      })
    });

  }
  public findInDataById(id: string):[number, Customer|null] {
    let tableData = this.sortedData == undefined?this.allData:this.sortedData;
    let index:number=-1;
    let dataObj;
    for (dataObj of tableData) {
      index++;
      console.log(dataObj.email);
      if (dataObj.id==id) {
        break;
      }
    }
    if (index==-1) {
      return [-1,null];
    }
   // let pageIndex = Math.trunc(index / this.paginator.pageSize);
   // console.log("Pageindex: "+pageIndex);
   // return [pageIndex,dataObj];
    return [0,dataObj];
  }
  public pageNoOf(obj: Customer):[number, Customer|null] {
    if (obj.id == undefined || obj.id == null) {
      throw Error('Object id cannot be null or undefined');
    }
    return this.findInDataById(obj.id);
  }

  items(): Customer[] {
    if (this.allData.length ==0) {
     // this.refresh();
    }
    return this.allData;
  }
  lazyLoad(event: LazyLoadEvent) {
    this.pageData = this.getPagedData(this.getSortedData([...this.allData ], event), event);
    this.lastLoadEvent=event;
  }

  private getPagedData(data: Customer[], event: LazyLoadEvent): Customer[] {
    return data.slice(event.first, (event.first! + event!.rows!));
  }

  private getSortedData(data: Customer[],  event: LazyLoadEvent): Customer[] {
    if (!event.sortField) {
      this.sortedData= data;
    }else{
      this.sortedData=data.sort((a, b) => {
        const isAsc = event.sortOrder==1;
        let sortField=event.sortField;
        if (!sortField || sortField === undefined) {
            sortField='firstName';
        }
        return compare(a[sortField], b[sortField], isAsc);
      });
    }

    return [...this.sortedData];
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
