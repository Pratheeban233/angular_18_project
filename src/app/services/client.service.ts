import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/interface/role';
import { Client } from '../model/class/client';
import { Constants } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  
  constructor(private http: HttpClient) {}

  getAllClients(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      environment.API_URL + Constants.CLIENT_API_ENDPOINTS.GET_ALL_CLIENTS
    );
  }

  addupdateClient(client: Client): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      environment.API_URL + Constants.CLIENT_API_ENDPOINTS.ADD_UPDATE_CLIENT,
      client
    );
  }

  deleteClientById(id: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(
      environment.API_URL +
        Constants.CLIENT_API_ENDPOINTS.DELETE_CLIENT_BY_ID +
        id
    );
  }

  getAllEmployees(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      environment.API_URL + Constants.CLIENT_API_ENDPOINTS.GET_ALL_EMPLOYEES
    );
  }

  addUpdateClientProject(projectObj: any): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      environment.API_URL +
        Constants.CLIENT_API_ENDPOINTS.ADD_UPDATE_CLIENT_PROJECT,
      projectObj
    );
  }

  getAllClientProjects(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      environment.API_URL +
        Constants.CLIENT_API_ENDPOINTS.GET_ALL_CLIENT_PROJECTS
    );
  }

}
