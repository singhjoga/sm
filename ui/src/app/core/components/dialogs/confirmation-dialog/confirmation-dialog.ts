import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'configmration-dialog',
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.scss']
})
export class ConfirmationDialog implements OnInit {
  title:string='';
  msgText:string='';
  okLabel:string='';
  cancelLabel:string='';
  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>,
    ) { }

  ngOnInit(): void {
  }
  onOK(): void {
    this.dialogRef.close('ok');
  }
  onCancel(): void {
    this.dialogRef.close('cancel');  
  }
}
