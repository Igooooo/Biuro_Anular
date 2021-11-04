import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Client } from 'src/app/shared/model/client';
import { ClientService } from './client.service';
import { DialogRemoveClientComponent } from './dialog-remove-client/dialog-remove-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  error: boolean = false;
  limit_show_client_min = 0;
  limit_show_client_max = 10;
  clients: Client[] = [];
  clientForm = new FormGroup({});
  dataSource?: any; // DO ZMIANY - nie może być any!!!
  displayedColumns: string[] = ['name', 'surname', 'city', 'street', 'phone', 'email', 'type', 'remove'];
  changes = new Subject<void>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private cd: ChangeDetectorRef,
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getClients();
    this.createFormClient();
  }

  createFormClient(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])]
    })
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients.data
        this.dataSource = new MatTableDataSource(clients.data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.error = true; // DO ZMIANY - do weryfikacji co to robi
        console.log('błąd w Kliencie ' + JSON.stringify(err));
      }
    );
  }

  loadClientByFilter(): void {
    this.clientService.getClientByFilter(this.clientForm.controls.name.value, this.clientForm.controls.surname.value, this.clientForm.controls.city.value).subscribe(
      (clients) => {
        this.clients = clients.data;
      }, err => {
        console.log('err ' + JSON.stringify(err));
      })
  }

  removeClient(client: Client) {
    this.clientService.removeClient(client.id).subscribe(() => {
      this.getClients();
      this.showToasterRemoveClient();
    }, err => {
      console.log('err ' + JSON.stringify(err));
      this.showToasterRemoveClientError();
    });
  }

  goToClientDetails(client: Client): void {
    this.router.navigate(['/client', client.id]);
  }

  reset(): void {
    this.clientForm.reset();
  }

  refresh(): void {
    this.getClients();
    this.cd.markForCheck();
    this.showToasterRefreshClient();
  }

  showToasterRemoveClient(): void {
    this.toastr.success("Użytkownik został pomyślnie usunięty!");
  }

  showToasterRemoveClientError(): void {
    this.toastr.error("Użytkownik nie został usunięty!");
  }

  showToasterRefreshClient(): void {
    this.toastr.success("Lista użytkowników została odświeżona!");
  }

  openDialog(client: Client, event: any): void {
    event.stopPropagation();
    this.dialog.open(DialogRemoveClientComponent, { data: { name: client.name, surname: client.surname } }).
      afterClosed().
      subscribe(result => {
        if (result === 'false') {
          this.removeClient(client);
        }
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase())
  }
}
