import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { ClientService } from '../../services/client.service';
import { IApiResponse } from '../../model/interface/role';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-client',
  imports: [FormsModule, AlertComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);

  alertType: string = '';
  alertMessage: string = '';
  alertClass: string = '';

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: IApiResponse) => {
      this.clientList = res.data;
    });
  }

  onSaveClient() {
    this.clientService
      .addupdateClient(this.clientObj)
      .subscribe((res: IApiResponse) => {
        if(res.result) {
          this.showAlert('Success', 'Client saved successfully', 'alert-success');
        }
        this.loadClient();
        this.clientObj = new Client();
      }, error => {
        this.showAlert('Error', error.message, 'alert-danger');
      });
  }

  onEdit(obj: Client) {
    this.clientObj = obj;
  }

  onDelete(id: number) {
    const isTrue = confirm('Are you sure to delete?');
    if (isTrue) {
      this.clientService.deleteClientById(id).subscribe((res: IApiResponse) => {
        if(res.result) {
          this.showAlert('Success', 'Client deleted successfully', 'alert-success');
        }
        this.loadClient();
      });
    }
  }

  onReset() {
    this.clientObj = new Client();
  }

  showAlert(type: string, message: string, alertClass: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.alertClass = alertClass;
    setTimeout(() => {
      this.alertMessage = '';
    }, 2000); // Clear the alert after 5 seconds
  }
}
