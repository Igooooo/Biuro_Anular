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

  clients: Client[] = [];
  clientForm = new FormGroup({});
  dataSource?:  MatTableDataSource<Client>;
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
        console.log('err ', err);
      }
    );
  }

  removeClient(client: Client) {
    this.clientService.removeClient(client.id).subscribe(() => {
      this.getClients();
      this.showToasterRemoveClient();
    }, err => {
      console.log('err ', err);
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
    this.toastr.success("Klient zosta?? pomy??lnie usuni??ty!");
  }

  showToasterRemoveClientError(): void {
    this.toastr.error("Klient nie zosta?? usuni??ty!");
  }

  showToasterRefreshClient(): void {
    this.toastr.success("Lista klient??w zosta??a od??wie??ona!");
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
  }
}
