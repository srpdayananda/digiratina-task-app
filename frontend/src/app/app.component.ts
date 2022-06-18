import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_TOKEN } from './constant/constant'
import { AUTH_USER } from './constant/constant'
import { Role } from './shared/enums/role.enum'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem(AUTH_TOKEN);
    const authUser = localStorage.getItem(AUTH_USER);
    const user = JSON.parse(authUser!);
    const isAlreadyAdminPath = window.location.pathname.indexOf('admin') === 1

    if (!token) {
      this.router.navigate(['auth'])
    }
    if (token && user.role === Role.ADMIN && !isAlreadyAdminPath) {
      this.router.navigate(['admin'])
    }
    if (token && user.role === Role.USER) {
      this.router.navigate(['user'])
    }
  }
}
