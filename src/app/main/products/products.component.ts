import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/model/product';
import { ProductService } from './product.service';
import { productType } from 'src/app/shared/enums/productType';
import { MatDialog } from '@angular/material/dialog';
import { DialogRemoveProductComponent } from './dialog-remove-product/dialog-remove-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  error :boolean = false;
  limit_show_product_min = 0;
  limit_show_product_max = 10;
  products: Product[] = [];
  productForm = new FormGroup({});
  
  constructor(private cd: ChangeDetectorRef,
              private productsService: ProductService,
              private router: Router,
              private toastr: ToastrService,              
              public dialog: MatDialog,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getProducts();
    this.createFormProduct();
    console.log("jestem w product.componetns")
  }

  createFormProduct() : void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
    })
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (products) => {
        this.products = products.data
      }, err => {
        this.error = true;
        console.log('błąd w productach ' + JSON.stringify(err));
      }
    );
  }

  loadProductByFilter() : void {
    this.productsService.getProductByFilter(this.productForm.controls.name.value).subscribe(
      (products) => {
      this.products = products.data;
      }, err => {
        console.log('err ' + JSON.stringify(err));
      }) 
  }
  
  removeProduct(product: Product) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    this.productsService.removeProduct(product.id).subscribe(() => {
      this.getProducts();
      this.showToasterRemoveProduct();
    }, err => {
      console.log('err ' + JSON.stringify(err));
      this.showToasterRemoveProductError();
    }); 
  }

  goToProductDetails(product: Product) : void {
    this.router.navigate(['/products', product.id]);
  }

  reset() : void {
    this.productForm.reset();
  }
  
  next() : void {
    if (this.limit_show_product_min + 10 < this.products.length){
      this.limit_show_product_min=this.limit_show_product_min+10
      this.limit_show_product_max=this.limit_show_product_max+10
    } else {
      this.limit_show_product_min=this.limit_show_product_min
      this.limit_show_product_max=this.limit_show_product_max
    }
  }

  back() : void {
    if (this.limit_show_product_min - 10 >= 0){
      this.limit_show_product_min=this.limit_show_product_min-10
      this.limit_show_product_max=this.limit_show_product_max-10
    } else {
      this.limit_show_product_min=this.limit_show_product_min
      this.limit_show_product_max=this.limit_show_product_max
    }
  }  

  refresh() : void {
    this.getProducts();
    this.cd.markForCheck();
    this.showToasterRefreshProduct();
  }

  showToasterRemoveProduct() : void {
    this.toastr.success("Użytkownik został pomyślnie usunięty!");
  }

  showToasterRemoveProductError() : void {
    this.toastr.error("Użytkownik nie został usunięty!");
  }

  showToasterRefreshProduct() : void {
    this.toastr.success("Lista użytkowników została odświeżona!");
  }

  openDialog(product : Product, event: any) : void {
    event.stopPropagation();
    this.dialog.open(DialogRemoveProductComponent, {data: {name: product.name}}).
    afterClosed().
    subscribe(result => {
      if(result === 'false'){
        this.removeProduct(product);
      }     
    });
  }
}

 