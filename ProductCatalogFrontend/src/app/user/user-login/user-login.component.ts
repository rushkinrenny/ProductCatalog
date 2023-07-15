import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HeaderService } from 'src/app/services/header.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  user: any;
  userEmail: string;
  userPassword: string;
  userName: string;
  constructor(
    private userService: UserService,
    private notifyService: NotificationService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  userLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.userLoginForm.get('email');
  }
  get password() {
    return this.userLoginForm.get('password');
  }

  userLogin() {
    this.userService
      .getUser(
        this.userLoginForm.value.email,
        this.userLoginForm.value.password
      )
      .subscribe(
        (response) => {
          this.user = response;
          this.showToasterSuccess();
          this.setAdminDetailsToLocalstorage();
        },
        (err) => {
          console.log(err.status);
          this.showToasterError();
        }
      );
  }

  isUserLoggedIn() {
    localStorage.getItem('userEmail') != null &&
      localStorage.getItem('role') != null;
  }

  showToasterSuccess() {
    this.notifyService.showSuccess('Login Successfully', 'User Login');
    this.headerService.isLoggedIn = true;
    setTimeout(() => {
      this.router.navigate(['/userlogin/showproducts']);
    }, 500);
  }

  showToasterError() {
    this.notifyService.showError('Invalid Credentials', 'User Login');
    this.userLoginForm.reset();
  }
  setAdminDetailsToLocalstorage() {
    localStorage.setItem('userEmail', this.userLoginForm.value.email);
    // localStorage.setItem('adminPassword', this.adminLoginForm.value.password);
    localStorage.setItem('name', this.user.firstName);
    localStorage.setItem('role', 'user');
  }
}
