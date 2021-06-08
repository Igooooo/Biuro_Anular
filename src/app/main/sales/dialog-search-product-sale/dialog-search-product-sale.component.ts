import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/model/product';
import { ProductDialogData } from 'src/app/shared/model/productDialogData';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-dialog-search-product-sale',
  templateUrl: './dialog-search-product-sale.component.html',
  styleUrls: ['./dialog-search-product-sale.component.scss']
})
export class DialogSearchProductSaleComponent implements OnInit {

  products: Product[] = [];
  limit_show_min = 0;
  limit_show_max = 10;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
              private productService: ProductService,) {}

  ngOnInit(): void { 
    this.getProduct()
  }

  getProduct(): void {
    this.productService.getProducts().subscribe(
      (product) => {
        this.products = product.data
      }, err => {
        console.log('błąd w Procukcie ' + JSON.stringify(err));
      }
    );
  }

  next() : void {
    if (this.limit_show_min + 10 < this.products.length){
      this.limit_show_min=this.limit_show_min+10
      this.limit_show_max=this.limit_show_max+10
    } else {
      this.limit_show_min=this.limit_show_min
      this.limit_show_max=this.limit_show_max
    }
  }

  back() : void {
    if (this.limit_show_min - 10 >= 0){
      this.limit_show_min=this.limit_show_min-10
      this.limit_show_max=this.limit_show_max-10
    } else {
      this.limit_show_min=this.limit_show_min
      this.limit_show_max=this.limit_show_max
    }
  }  
}