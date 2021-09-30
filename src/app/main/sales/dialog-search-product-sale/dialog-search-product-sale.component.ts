import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
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

  dataSource?: any;
  displayedColumns: string[] = ['name', 'type'];
  changes = new Subject<void>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
              private productService: ProductService,) {}

  ngOnInit(): void { 
    this.getProduct()
  }

  getProduct(): void {
    this.productService.getProducts().subscribe(
      (product) => {
        this.products = product.data
        this.dataSource = new MatTableDataSource(product.data);        
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log('błąd w Procukcie ' + JSON.stringify(err));
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
}