import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControllerService } from '@app/core/classes/form-controller-service';
import { DialogMode } from '@app/shared/constants';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'dhaba-details',
  templateUrl: './dhaba-details.component.html',
  styleUrls: ['./dhaba-details.component.scss'],
  viewProviders:[FormControllerService]
})
export class DhabaDetailsComponent implements OnInit{

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,

  ) {

  }

  ngOnInit(): void {

  }
  getId():string {
    return this.config.data.id;
  }
  getMode():DialogMode {
    return this.config.data.mode;
  }
  onClose() {
    this.dialogRef.close();
  }
}
