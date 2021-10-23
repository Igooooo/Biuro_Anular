import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { productType } from 'src/app/shared/enums/productType';
import { ProductService } from '../product.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm = new FormGroup({});
  
  typeOfProductDefault = productType.normalny ;
  typeOfProduct = Object.values(productType);
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  phoneRegex = /^[+,\d]\d{7,12}$/;
  fieldTextType?: boolean;

  constructor(private cd: ChangeDetectorRef,    
              private productsService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createFormProduct();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  createFormProduct() : void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      volume: ['',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(11)])],
      provider:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      other: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      type: [this.typeOfProductDefault,Validators.required]
    });
    this.cd.markForCheck();
  }

  addProduct() : void {
    this.productsService.addProduct(this.productForm.value).subscribe(() => {
      console.log('formularz' + this.productForm.value);
      this.router.navigate(['/products']);
      this.showToasterAddProduct();
    }, err => {   
        this.showToasterAddProductError(err.error.message);
      }
    );
  }

  reset() : void {
    this.productForm.reset({
        type: this.typeOfProductDefault
    });
  }

  showToasterAddProduct() : void {
    this.toastr.success("Produkt " + this.productForm.controls.name.value + " został dodany pomyślnie!");
  }

  showToasterAddProductError(err : string) : void {
    let lenghtErr = err.length;
    let text = err.substr(0,lenghtErr-1);
    this.toastr.error(text);
  }
}
