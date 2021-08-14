import { LazyLoadEvent } from 'primeng/api';
import { AbstractResource } from '@app/01_models/AbstractResource';
import { CrudService } from '@app/core/services/crud-service';

export abstract class AbstractDataSource <T extends AbstractResource>{
  allData: AbstractResource[]=[];
  pageData: AbstractResource[] = [];
  sortedData?: AbstractResource[];
  loading: boolean=false;
  lastLoadEvent: LazyLoadEvent|undefined;
  constructor(private service: CrudService<T, string>) {
    this.refresh();
  }
  public delete(id: string):Promise<void> {
    return this.service.delete(id);
  }
  public refresh():Promise<void> {
    return new Promise<void>((resolve,reject)=> {
      setTimeout(()=> {
        this.findAll().then(resp => {
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
  public findAll():Promise<any[]> {
    return this.service.findAll();
  }
  public findInDataById(id: string):[number, AbstractResource|null] {
    let tableData = this.sortedData == undefined?this.allData:this.sortedData;
    let index:number=-1;
    let dataObj;
    for (dataObj of tableData) {
      index++;
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
    return [index,dataObj];
  }
  public pageNoOf(obj: AbstractResource):[number, AbstractResource|null] {
    if (obj.id == undefined || obj.id == null) {
      throw Error('Object id cannot be null or undefined');
    }
    return this.findInDataById(obj.id);
  }

  items(): AbstractResource[] {
    if (this.allData.length ==0) {
     // this.refresh();
    }
    return this.allData;
  }
  lazyLoad(event: LazyLoadEvent) {
    this.pageData = this.getPagedData(this.getSortedData([...this.allData ], event), event);
    this.lastLoadEvent=event;
  }

  private getPagedData(data: AbstractResource[], event: LazyLoadEvent): AbstractResource[] {
    return data.slice(event.first, (event.first! + event!.rows!));
  }

  private getSortedData(data: AbstractResource[],  event: LazyLoadEvent): AbstractResource[] {
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
