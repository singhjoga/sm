import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerWithAddress } from '@app/01_models/CustomerWithAddress';
import { Dhaba } from '@app/01_models/Dhaba';
import { ListController } from '@app/core/classes/list-controller';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { DhabaUiService } from '../dhaba.ui.service';
@Component({
  selector: 'dhaba-management',
  templateUrl: './dhaba-management.component.html',
  styleUrls: ['./dhaba-management.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class DhabaManagementComponent extends ListController<Dhaba, Dhaba> implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'orderEmail', 'orderPhone', 'taxNo'];
  @ViewChild('dataTable') 
  dataTable!: Table;

  constructor(uiService: DhabaUiService) {
      super(uiService);
  }
  ngOnInit() {
    super.onInit();
  }
  ngAfterViewInit(): void {
    super.onAfterViewInit();
  }

  getTable(): Table {
    return this.dataTable;
  }
  getId(obj: Dhaba): string {
    return obj.id!;
  }
  afterAdd(id:string) {
     this.view(id).onClose.subscribe(result => {
       this.refresh(id);
     });
  }
}
