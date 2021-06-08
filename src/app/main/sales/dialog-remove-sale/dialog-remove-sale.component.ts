import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remove-sale',
  templateUrl: './dialog-remove-sale.component.html',
  styleUrls: ['./dialog-remove-sale.component.scss']
})
export class DialogRemoveSaleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void { 
  }
}