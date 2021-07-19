import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DeleteUserDialog {
  id: string;
  name: string;
  isLoading: false;
  type: 'confirmation'
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  response: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteUserDialog) {
      // console.log(this.data)
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYes(data: any) {
    data.response = true;
    this.dialogRef.close(data);
  }

  ngOnInit() {

  }


}
