import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isPay } from 'src/app/shared/enums/isPay';
import { Sale } from 'src/app/shared/model/sale';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss']
})
export class SaleDetailsComponent implements OnInit {

  saleForm = new FormGroup({});
  sale?: Sale;
  isPayDefault = isPay.tak ;
  isPay = Object.values(isPay);

  // Walidacja formularza
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ageRegex = /^\d+/;
  phoneRegex = /^[+,\d]\d{7,12}$/;

  constructor(private saleService: SalesService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createFormSale();
    this.loadSale();
  }
  
  createFormSale() : void {
    this.saleForm = this.formBuilder.group({
      id: [''],
      productId: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      clientId: ['',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      price:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      isPay: [this.isPayDefault,Validators.required],
      volumen: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      other_1: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      other_2: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
    })
  }
  
  updateSale(): void {
    this.saleService.updateSale(this.saleForm.value).subscribe(() => {
      this.router.navigate(['/sales']);
      this.showToasterUpdateSale();
    }, err => {   
      console.log('jestem w error ' + err);
      this.showToasterUpdateSaleError();
      }
    );
  }

  loadSale() : void {
    // z aktualnego URLa zczytaujemy id igawka aktualnego routa. Pozwala zczytać aktualnego URLa i dobrac się do jego id | + przebaria string na number
    const id = +this.route.snapshot.params['id']; 
    this.saleService.getSale(id).subscribe( // przekazujemy id i zostajemy subscriberami
      (sale) => {
      this.sale = sale.data;
      this.saleForm.patchValue(this.sale);
      console.log('Odebrany JSON'+ JSON.stringify(this.sale.id));
      }, err => {
        console.log('err' + err);
      }) 
  }

  showToasterUpdateSale() : void{
    this.toastr.success(this.saleForm.controls.id.value + " został zaktualizowany pomyślnie!");
  }

  showToasterUpdateSaleError() : void{
    this.toastr.error(this.saleForm.controls.id.value + " został nie został zaktualizowany pomyślnie!");
  }
}
