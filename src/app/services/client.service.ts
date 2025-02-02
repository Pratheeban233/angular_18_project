import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/interface/role';
import { Client } from '../model/class/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getAllClients(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(environment.API_URL + 'GetAllClients');
  }

  addupdateClient(client: Client): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      environment.API_URL + 'AddUpdateClient',
      client
    );
  }

  deleteClientById(id: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(
      environment.API_URL + 'DeleteClientByClientId?clientId=' + id
    );
  }
}
