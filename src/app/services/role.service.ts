import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponse, IRole } from '../model/interface/role';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  rolesList: IRole[] = [];
  http = inject(HttpClient);

  // constructor(private http: HttpClient) {}

  getAllRoles(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(environment.API_URL + 'GetAllRoles');
  }

  getAllDesignations(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(environment.API_URL + 'GetAllDesignation'
    );
  }
}
