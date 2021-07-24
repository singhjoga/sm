import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) { }

    show(message: string, snackbarType: string, action: string='',duration = 5000) {
        this.snackBar.open(message, action, {
            duration,
            verticalPosition: 'top',
            panelClass: [snackbarType]
        });
    }
    showSuccess(message: string) {
        this.show(message,'success-snackbar');
    }
    showError(message: string) {
        this.show(message,'error-snackbar');
    }
    showInfo(message: string) {
        this.show(message,'info-snackbar');
    }
}
