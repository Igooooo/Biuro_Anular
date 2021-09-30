import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
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

  dataSource?: any;
  displayedColumns: string[] = ['name', 'surname'];
  changes = new Subject<void>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ClientDialogData,
              private clientService: ClientService,) {}

  ngOnInit(): void { 
    this.getClients()
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients.data
        this.dataSource = new MatTableDataSource(clients.data);        
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log('błąd w Kliencie ' + JSON.stringify(err));
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
