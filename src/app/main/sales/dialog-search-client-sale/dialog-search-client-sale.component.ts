import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/shared/model/client';
import { ClientDialogData } from 'src/app/shared/model/ClientDialogData';
import { ClientService } from '../../clients/client.service';

@Component({
  selector: 'app-dialog-search-client-sale',
  templateUrl: './dialog-search-client-sale.component.html',
  styleUrls: ['./dialog-search-client-sale.component.scss']
})
export class DialogSearchClientSaleComponent implements OnInit {

  clients: Client[] = [];
  limit_show_min = 0;
  limit_show_max = 10;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ClientDialogData,
              private clientService: ClientService,) {}

  ngOnInit(): void { 
    this.getClients()
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients.data
      }, err => {
        console.log('błąd w Kliencie ' + JSON.stringify(err));
      }
    );
  }
  
  next() : void {
    if (this.limit_show_min + 10 < this.clients.length){
      this.limit_show_min=this.limit_show_min+10
      this.limit_show_max=this.limit_show_max+10
    } else {
      this.limit_show_min=this.limit_show_min
      this.limit_show_max=this.limit_show_max
    }
  }

  back() : void {
    if (this.limit_show_min - 10 >= 0){
      this.limit_show_min=this.limit_show_min-10
      this.limit_show_max=this.limit_show_max-10
    } else {
      this.limit_show_min=this.limit_show_min
      this.limit_show_max=this.limit_show_max
    }
  }  
}
