import { Component, OnInit, Inject } from '@angular/core';
import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { ConfigmrationDialogButton} from '../constants';
@Component({
  selector: 'configmration-dialog-ng',
  templateUrl: './confirmation-dialog-ng.html',
  styleUrls: ['./confirmation-dialog-ng.scss']
})
export class ConfirmationDialogNg implements OnInit {
  title:string='';
  msgText:string='';
  yesLabel:string='';
  noLabel:string='';
  cancelLabel:string='';
  icon='live_help';
  iconColor="primary";
  constructor(public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig
    ) { 
      this.title=this.config.data.title;
      this.msgText=this.config.data.msgText;
      this.yesLabel=this.config.data.yesLabel;
      this.noLabel=this.config.data.noLabel;
      this.cancelLabel=this.config.data.cancelLabel;
      this.icon=this.config.data.icon;
      this.iconColor=this.config.data.iconColor;
    }

  ngOnInit(): void {
  }
  onYes(): void {
    this.dialogRef.close(ConfigmrationDialogButton.Yes);
  }
  onNo(): void {
    this.dialogRef.close(ConfigmrationDialogButton.No);
  }
  onCancel(): void {
    this.dialogRef.close(ConfigmrationDialogButton.Cancel);  
  }
}
