import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfigmrationDialogButton} from '../constants';
@Component({
  selector: 'configmration-dialog',
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.scss']
})
export class ConfirmationDialog implements OnInit {
  title:string='';
  msgText:string='';
  yesLabel:string='';
  noLabel:string='';
  cancelLabel:string='';
  icon='live_help';
  iconColor="primary";
  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>,
    ) { }

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
