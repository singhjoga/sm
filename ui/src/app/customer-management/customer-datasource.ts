import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from './customer.service';
export class CustomerDataSource extends DataSource<Customer> {
  data: Customer[]=[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private service: CustomerService) {
    super();
  }

  connect(): Observable<Customer[]> {
    if (this.paginator && this.sort) {
      return this.service.findAll()
      .pipe(map((resp) => {
        this.data=resp;
        return this.getPagedData(this.getSortedData([...this.data ]));
      }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

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
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      let sortField=this.sort?.active;
      if (!sortField || sortField === undefined) {
          sortField='firstName';
      }
      return compare(a[sortField], b[sortField], isAsc);
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
