import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/shared/model/client';
import { ClientService } from './client.service';
import { DialogRemoveClientComponent } from './dialog-remove-client/dialog-remove-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  error :boolean = false;
  limit_show_client_min = 0;
  limit_show_client_max = 10;
  clients: Client[] = [];
  clientForm = new FormGroup({});
  
  constructor(private cd: ChangeDetectorRef,
              private clientService: ClientService,
              private router: Router,
              private toastr: ToastrService,              
              public dialog: MatDialog,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getClients();
    this.createFormClient();
    console.log("jestem w client.componetns")
  }

  createFormClient() : void {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])]
    })
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients.data
      }, err => {
        this.error = true;
        console.log('błąd w Kliencie ' + JSON.stringify(err));
      }
    );
  }

  loadClientByFilter() : void {
    this.clientService.getClientByFilter(this.clientForm.controls.name.value, this.clientForm.controls.surname.value, this.clientForm.controls.city.value).subscribe(
      (clients) => {
      this.clients = clients.data;
      }, err => {
        console.log('err ' + JSON.stringify(err));
      }) 
  }
  
  removeClient(client: Client) {  // metoda event ma zapobiec przekierowaniu do detali samochodu (guzuk remove jest na jego polu)
    this.clientService.removeClient(client.id).subscribe(() => {
      this.getClients();
      this.showToasterRemoveClient();
    }, err => {
      console.log('err ' + JSON.stringify(err));
      this.showToasterRemoveClientError();
    }); 
  }

  goToClientDetails(client: Client) : void {
    this.router.navigate(['/client', client.id]);
  }

  reset() : void {
    this.clientForm.reset();
  }
  
  next() : void {
    if (this.limit_show_client_min + 10 < this.clients.length){
      this.limit_show_client_min=this.limit_show_client_min+10
      this.limit_show_client_max=this.limit_show_client_max+10
    } else {
      this.limit_show_client_min=this.limit_show_client_min
      this.limit_show_client_max=this.limit_show_client_max
    }
  }

  back() : void {
    if (this.limit_show_client_min - 10 >= 0){
      this.limit_show_client_min=this.limit_show_client_min-10
      this.limit_show_client_max=this.limit_show_client_max-10
    } else {
      this.limit_show_client_min=this.limit_show_client_min
      this.limit_show_client_max=this.limit_show_client_max
    }
  }  

  refresh() : void {
    this.getClients();
    this.cd.markForCheck();
    this.showToasterRefreshClient();
  }

  showToasterRemoveClient() : void {
    this.toastr.success("Użytkownik został pomyślnie usunięty!");
  }

  showToasterRemoveClientError() : void {
    this.toastr.error("Użytkownik nie został usunięty!");
  }

  showToasterRefreshClient() : void {
    this.toastr.success("Lista użytkowników została odświeżona!");
  }

  openDialog(client : Client, event: any) : void {
    event.stopPropagation();
    this.dialog.open(DialogRemoveClientComponent, {data: {name: client.name, surname: client.surname}}).
    afterClosed().
    subscribe(result => {
      if(result === 'false'){
        this.removeClient(client);
      }     
    });
  }
}
