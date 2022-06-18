import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth/auth.service';
import { DataService } from '../../core/services/data/data.service';
import { Role } from '../../shared/enums/role.enum';
import { AUTH_TOKEN, AUTH_USER } from '../../constant/constant'
import { AuthResponseProps } from '../../shared/type/auth-props';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  loginClickedHandler(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (response: AuthResponseProps) => {
        if (response.success && response.user?.accessToken) {
          this.toastr.success(response.message, 'Success!');
          localStorage.setItem(AUTH_TOKEN, response.user.accessToken);

          const { id, username, password, name, address, mobileNumber, role } = response.user;
          this.dataService.setIsLoggedIn(true);
          this.dataService.setLoggedUser({
            id, username, password, name, address, mobileNumber, role
          });
          if (role === Role.ADMIN) {
            this.router.navigate(['admin']);
          } else if (role === Role.USER) {
            this.router.navigate(['user']);
          }
        } else {
          this.toastr.error('Login Failed');
        }
      },
      (err) => {
        if (err?.error?.error) {
          this.toastr.error(err?.error?.error, 'Error!');
        }
      }
    );
  }

}
