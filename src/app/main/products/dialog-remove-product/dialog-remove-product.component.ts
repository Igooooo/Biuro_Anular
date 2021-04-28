import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remove-product',
  templateUrl: './dialog-remove-product.component.html',
  styleUrls: ['./dialog-remove-product.component.scss']
})
export class DialogRemoveProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void { 
    }
}
