import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isPay } from 'src/app/shared/enums/isPay';
import { Client } from 'src/app/shared/model/client';
import { ClientService } from '../../clients/client.service';
import { DialogSearchClientSaleComponent } from '../dialog-search-client-sale/dialog-search-client-sale.component';
import { DialogSearchProductSaleComponent } from '../dialog-search-product-sale/dialog-search-product-sale.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

  saleForm = new FormGroup({});
  clientIdFromDiag?: number;
  clientNameFromDiag?: string;
  clientSurnameFromDiag?: string;
  productIdFromDiag?: number;
  productNameFromDiag?: string;
  typeOfPayDefault = isPay.tak ;
  typeOfSale = Object.values(isPay);
  clients: Client[] = [];
  error :boolean = false;
  fieldTextType?: boolean;

  constructor(private cd: ChangeDetectorRef,    
              private saleService: SalesService,
              private clientService: ClientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createFormSale();
    this.getClients();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  createFormSale() : void {
    this.saleForm = this.formBuilder.group({
      price: ['',Validators.required],
      volumen: ['',Validators.required],
      isPay: [this.typeOfPayDefault,Validators.required],
      other_1: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])],
      other_2: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])],
      productId: ['', Validators.required],
      clientId: ['', Validators.required],         
  });
    this.cd.markForCheck();
  }

  addSale() : void {
    this.saleService.addSale(this.saleForm.value).subscribe(() => {
      this.router.navigate(['/sales']);
      this.showToasterAddSale();
    }, err => { 
        console.log('err ', err);  
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
  
  getClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients.data
      }, err => {
        console.log('err ', err);
      }
    );
  }

  openDialogClient(event: any) : void {
    event.stopPropagation();
    this.dialog.open(DialogSearchClientSaleComponent, {
      width: '500px',
      data: {id: this.clientIdFromDiag}
    }).
    afterClosed().
    subscribe(result => {
      this.clientIdFromDiag = result.id;
      this.clientNameFromDiag = result.name;
      this.clientSurnameFromDiag = result.surname;
      this.saleForm.controls['clientId'].setValue(this.clientIdFromDiag)
    });
  }

  openDialogProduct(event: any) : void { // DO ZMIANY - nie moze byc any
    event.stopPropagation();
    this.dialog.open(DialogSearchProductSaleComponent, {
      width: '500px',
      data: {id: this.productIdFromDiag}
    }).
    afterClosed().
    subscribe(result => {
      this.productIdFromDiag = result.id;
      this.productNameFromDiag = result.name
      this.saleForm.controls['productId'].setValue(this.productIdFromDiag)
    });
  }
}
