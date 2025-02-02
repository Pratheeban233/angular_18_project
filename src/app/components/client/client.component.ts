import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { ClientService } from '../../services/client.service';
import { IApiResponse } from '../../model/interface/role';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);

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
        res.result ? alert('Client saved successfully') : alert(res.message);
        this.loadClient();
        this.clientObj = new Client();
      });
  }

  onEdit(obj: Client) {
    this.clientObj = obj;
  }

  onDelete(id: number) {
    const isTrue = confirm('Are you sure to delete?');
    if (isTrue) {
      this.clientService.deleteClientById(id).subscribe((res: IApiResponse) => {
        alert('Client deleted successfully');
        this.loadClient();
      });
    }
  }

  onReset() {
    this.clientObj = new Client();
  }
}
