import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-remove-user',
  templateUrl: './dialog-remove-user.component.html',
  styleUrls: ['./dialog-remove-user.component.scss']
})
export class DialogRemoveUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private matDialogRef: MatDialogRef<DialogRemoveUserComponent>,) {}

    ngOnInit(): void { 
    }
}
