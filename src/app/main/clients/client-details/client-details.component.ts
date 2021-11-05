import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { clientType } from 'src/app/shared/enums/clientType';
import { Client } from 'src/app/shared/model/client';
import { ClientService } from '../client.service';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  clientForm = new FormGroup({});
  client: Client[] = [];
  typeOfClientDefault = clientType.normalny ;
  typeOfClient = Object.values(clientType);
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ageRegex = /^\d+/;
  phoneRegex = /^[+,\d]\d{7,12}$/;

  constructor(private clientService: ClientService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createFormClient();
    this.loadClient();
  }
  
  createFormClient() : void {
    this.clientForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      phone: ['',Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])],
      email: ['',Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      city:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      street: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      type: [this.typeOfClientDefault,Validators.required],
      peselOrNIP: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(11)])],
      documentID: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      other: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])]      
    })
  }
  
  updateClient(): void {
    this.clientService.updateClient(this.clientForm.value).subscribe(() => {
      this.router.navigate(['/clients']);
      this.showToasterUpdateClient();
    }, err => {   
      this.showToasterUpdateClientError();
      }
    );
  }

  loadClient() : void {
    const id = +this.route.snapshot.params['id']; 
    this.clientService.getClient(id).subscribe(
      (client) => {
      this.client = client.data;
      this.clientForm.patchValue(this.client);
      }, err => {
        console.log('err ', err);
      }) 
  }

  showToasterUpdateClient() : void{
    this.toastr.success(this.clientForm.controls.name.value + " " + this.clientForm.controls.surname.value + " został zaktualizowany pomyślnie!");
  }

  showToasterUpdateClientError() : void {
    this.toastr.error(this.clientForm.controls.name.value + " " + this.clientForm.controls.surname.value + " nie został zaktualizowany pomyślnie!");
  }
}
