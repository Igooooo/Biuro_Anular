import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remove-client',
  templateUrl: './dialog-remove-client.component.html',
  styleUrls: ['./dialog-remove-client.component.scss']
})
export class DialogRemoveClientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void { 
  }
}
