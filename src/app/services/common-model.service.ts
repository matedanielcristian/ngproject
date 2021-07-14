import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../components/reusable/dialog/dialog.component';

@Injectable()
export class CommonModelService {
  data: any = {};
  constructor(public dialog: MatDialog) { }
  openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: this.data
    });

    return dialogRef.afterClosed();
  }
}
