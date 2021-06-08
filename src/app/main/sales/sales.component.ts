import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/shared/model/client';
import { Product } from 'src/app/shared/model/product';
import { Sale } from 'src/app/shared/model/sale';
import { DialogRemoveSaleComponent } from './dialog-remove-sale/dialog-remove-sale.component';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  error :boolean = false;
  limit_show_sale_min = 0;
  limit_show_sale_max = 10;
  sales: Sale[] = [];
  product: Product[] = [];
  client: Client[] = [];
  saleForm = new FormGroup({});
  
  constructor(private cd: ChangeDetectorRef,
              private saleService: SalesService,
              private router: Router,
              private toastr: ToastrService,              
              public dialog: MatDialog,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getSales();
    this.createFormSale();
  }

  createFormSale() : void {
    this.saleForm = this.formBuilder.group({
      client_id: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
    })
  }

  getSales(): void {
    this.saleService.getSales().subscribe(
      (sales) => {
        this.sales = sales.data
      }, err => {
        this.error = true;
        console.log('błąd w saleach ' + JSON.stringify(err));
      }
    );
  }

  loadSaleByFilter() : void {
    this.saleService.getSaleByFilter(this.saleForm.controls.client_id.value).subscribe(
      (sales) => {
      this.sales = sales.data;
      }, err => {
        console.log('err ' + JSON.stringify(err));
      }) 
  }
  
  removeSale(sale: Sale) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    this.saleService.removeSale(sale.id).subscribe(() => {
      this.getSales();
      this.showToasterRemoveSale();
    }, err => {
      console.log('err ' + JSON.stringify(err));
      this.showToasterRemoveSaleError();
    }); 
  }

  goToSaleDetails(sale: Sale) : void {
    this.router.navigate(['/sale', sale.id]);
  }

  reset() : void {
    this.saleForm.reset();
  }
  
  next() : void {
    if (this.limit_show_sale_min + 10 < this.sales.length){
      this.limit_show_sale_min=this.limit_show_sale_min+10
      this.limit_show_sale_max=this.limit_show_sale_max+10
    } else {
      this.limit_show_sale_min=this.limit_show_sale_min
      this.limit_show_sale_max=this.limit_show_sale_max
    }
  }

  back() : void {
    if (this.limit_show_sale_min - 10 >= 0){
      this.limit_show_sale_min=this.limit_show_sale_min-10
      this.limit_show_sale_max=this.limit_show_sale_max-10
    } else {
      this.limit_show_sale_min=this.limit_show_sale_min
      this.limit_show_sale_max=this.limit_show_sale_max
    }
  }  

  refresh() : void {
    this.getSales();
    this.cd.markForCheck();
    this.showToasterRefreshSale();
  }

  showToasterRemoveSale() : void {
    this.toastr.success("Sprzedaż został pomyślnie usunięta!");
  }

  showToasterRemoveSaleError() : void {
    this.toastr.error("Sprzedaż nie została usunięta!");
  }

  showToasterRefreshSale() : void {
    this.toastr.success("Lista sprzedaży została odświeżona!");
  }

  openDialog(sale : Sale, event: any) : void {
    event.stopPropagation();
    this.dialog.open(DialogRemoveSaleComponent, {data: {id: sale.id}}).
    afterClosed().
    subscribe(result => {
      if(result === 'false'){
        this.removeSale(sale);
      }     
    });
  }
}