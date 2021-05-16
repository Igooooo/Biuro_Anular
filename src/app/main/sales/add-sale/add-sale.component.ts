import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isPay } from 'src/app/shared/enums/isPay';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

  saleForm = new FormGroup({});
  
  // Typ klienta
  typeOfPayDefault = isPay.tak ;
  typeOfSale = Object.values(isPay);

  constructor(private cd: ChangeDetectorRef,    
              private saleService: SalesService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createFormSale();
  }

fieldTextType?: boolean;

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

  createFormSale() : void {
    this.saleForm = this.formBuilder.group({
      product_id: ['', Validators.required],
      client_id: ['', Validators.required],
      price: ['',Validators.required],
      volumen: ['',Validators.required],
      isPay: [this.typeOfPayDefault,Validators.required],
      other_1: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])],
      other_2: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])]         
  });
    this.cd.markForCheck();
  }

  addSale() : void {
    this.saleService.addSale(this.saleForm.value).subscribe(() => {
      this.router.navigate(['/sales']);
      this.showToasterAddSale();
    }, err => {   
        this.showToasterAddSaleError();
      }
    );
  }

  reset() : void {
    this.saleForm.reset({
        type: this.typeOfPayDefault
    });
  }

  showToasterAddSale() : void {
    this.toastr.success("Sprzedaż została dodana pomyślnie!");
  }

  showToasterAddSaleError() : void {
    this.toastr.error("Błąd podczas dodawania!");
  }
}
