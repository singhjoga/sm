import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of as observableOf, merge, Subject, Subscription } from 'rxjs';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from './customer.service';

export class CustomerDataSource extends DataSource<Customer>{
  data: Customer[]=[];
  paginator: MatPaginator ;
  sort: MatSort ;
  dataPipe$: Subject<Customer[]> = new Subject();
  subscription!: Subscription;
  sortedData?: Customer[];
  constructor(private service: CustomerService,
    paginator: MatPaginator,
    sort: MatSort) {
    super();
    this.paginator=paginator;
    this.sort=sort;
    const all = merge(this.sort.sortChange, this.paginator.page);
    this.subscription =all.subscribe(()=> {
      this.setPipeData();
    })
  }

  public refresh():Promise<void> {
    return new Promise<void>((resolve,reject)=> {
      setTimeout(()=> {
        this.service.findAll().subscribe(resp => {
          this.data=resp;
          this.setPipeData();
          resolve();
        })
      })
    });

  }
  public findInDataById(id: string):[number, Customer|null] {
    let tableData = this.sortedData == undefined?this.data:this.sortedData;
    console.log("Item count: "+tableData.length);
    let index:number=-1;
    let dataObj;
    for (dataObj of tableData) {
      index++;
      console.log(dataObj.email);
      if (dataObj.id==id) {
        break;
      }
    }
    console.log("Index: "+index);
    if (index==-1) {
      return [-1,null];
    }
    let pageIndex = Math.trunc(index / this.paginator.pageSize);
    console.log("Pageindex: "+pageIndex);
    return [pageIndex,dataObj];
  }
  public pageNoOf(obj: Customer):[number, Customer|null] {
    if (obj.id == undefined || obj.id == null) {
      throw Error('Object id cannot be null or undefined');
    }
    return this.findInDataById(obj.id);
  }
  private setPipeData() {
    this.dataPipe$.next(this.getPagedData(this.getSortedData([...this.data ])));
  }
  connect(): Observable<Customer[]> {
    if (this.paginator && this.sort) {
      if (this.data.length ==0) {
        this.refresh();
      }else{
        this.setPipeData();
      }
      return this.dataPipe$;
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPagedData(data: Customer[]): Customer[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Customer[]): Customer[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      this.sortedData= data;
    }else{
      this.sortedData=data.sort((a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        let sortField=this.sort?.active;
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
