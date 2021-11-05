import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concat, Subject } from 'rxjs';
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


  sales: Sale[] = [];
  product: Product[] = [];
  client: Client[] = [];
  saleForm = new FormGroup({});
  dataSource?: MatTableDataSource<Sale>;
  displayedColumns: string[] = ['name', 'client.name_client.surname', 'price', 'isPay', 'volumen', 'other_1', 'other_2', 'remove'];
  changes = new Subject<void>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

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

  createFormSale(): void {
    this.saleForm = this.formBuilder.group({
      clientId: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
    })
  }

  getSales(): void {
    this.saleService.getSales().subscribe(
      (sales) => {
        this.sales = sales.data
        this.dataSource = new MatTableDataSource(sales.data);
        this.dataSource.filterPredicate = (data: Sale, filter: string) => {
          return data.client.name.toLowerCase().includes(filter.toLowerCase()) ||
            data.client.surname.toLowerCase().includes(filter.toLowerCase()) ||
            data.product.name.toLowerCase().includes(filter.toLowerCase()) || 
            data.client.name.toLowerCase().concat(' ', data.client.surname.toLowerCase()).includes(filter.toLowerCase()); 
       };
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log('err ', err);
      }
    );
  }

  removeSale(sale: Sale) {
    this.saleService.removeSale(sale.id).subscribe(() => {
      this.getSales();
      this.showToasterRemoveSale();
    }, err => {
      console.log('err ', err);
      this.showToasterRemoveSaleError();
    });
  }

  goToSaleDetails(sale: Sale): void {
    this.router.navigate(['/sale', sale.id]);
  }

  reset(): void {
    this.saleForm.reset();
  }

  refresh(): void {
    this.getSales();
    this.cd.markForCheck();
    this.showToasterRefreshSale();
  }

  showToasterRemoveSale(): void {
    this.toastr.success("Sprzedaż został pomyślnie usunięta!");
  }

  showToasterRemoveSaleError(): void {
    this.toastr.error("Sprzedaż nie została usunięta!");
  }

  showToasterRefreshSale(): void {
    this.toastr.success("Lista sprzedaży została odświeżona!");
  }

  openDialog(sale: Sale, event: any): void {
    event.stopPropagation();
    this.dialog.open(DialogRemoveSaleComponent, { data: { id: sale.id } }).
      afterClosed().
      subscribe(result => {
        if (result === 'false') {
          this.removeSale(sale);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}