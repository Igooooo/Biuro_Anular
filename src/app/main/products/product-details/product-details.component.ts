import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/model/product';
import { ProductService } from '../product.service';
import { productType } from 'src/app/shared/enums/productType';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productForm = new FormGroup({});
  product: Product[] = [];

  // Typ klienta
  typeOfProductDefault = productType.normalny ;
  typeOfProduct = Object.values(productType);

  // Walidacja formularza
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ageRegex = /^\d+/;
  phoneRegex = /^[+,\d]\d{7,12}$/;

  constructor(private productsService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createFormProduct();
    this.loadProduct();
  }
  
  createFormProduct() : void {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      volume: ['',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      provider:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      other: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      type: [this.typeOfProductDefault,Validators.required]
    })
  }
  
  updateProduct(): void {
    this.productsService.updateProduct(this.productForm.value).subscribe(
      err => {
        console.log('err' + err);
      }
    );
    this.router.navigate(['/products']);
    this.showToasterUpdateProduct();
  }

  loadProduct() : void {
    // z aktualnego URLa zczytaujemy id igawka aktualnego routa. Pozwala zczytać aktualnego URLa i dobrac się do jego id | + przebaria string na number
    const id = +this.route.snapshot.params['id']; 
    this.productsService.getProduct(id).subscribe( // przekazujemy id i zostajemy subscriberami
      (product) => {
      console.log('product'+ JSON.stringify(product.data));
      this.product = product.data;
      this.productForm.patchValue(this.product);
      console.log('Odebrany JSON'+ JSON.stringify(this.product));
      }, err => {
        console.log('err' + err);
      }) 
  }

  showToasterUpdateProduct() : void{
    this.toastr.success(this.productForm.controls.name.value + " został zaktualizowany pomyślnie!");
  }
}
