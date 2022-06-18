import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthInputProps, AuthResponseProps } from '../../../shared/type/auth-props';
import { AUTH_USER } from '../../../constant/constant';
import { Role } from '../../../shared/enums/role.enum'

import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.apiUrl;
  }

  login(props: AuthInputProps): Observable<AuthResponseProps> {
    return this.http.post<AuthResponseProps>(`${this.API_URL}/login`, props);
  }

  isAdmin() {
    const authUser = localStorage.getItem(AUTH_USER);
    const user = JSON.parse(authUser!);
    return user.role === Role.ADMIN;
  }
}