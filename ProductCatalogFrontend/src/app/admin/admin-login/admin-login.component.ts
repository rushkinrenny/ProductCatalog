import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HeaderService } from 'src/app/services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  admin: any;
  adminEmail: string;
  adminPassword: string;
  adminName: string;
  constructor(
    private adminService: AdminService,
    private notifyService: NotificationService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }
  adminLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.adminLoginForm.get('email');
  }
  get password() {
    return this.adminLoginForm.get('password');
  }

  adminLogin() {
    this.adminService
      .getAdmin(
        this.adminLoginForm.value.email,
        this.adminLoginForm.value.password
      )
      .subscribe(
        (response) => {
          this.admin = response;
          this.showToasterSuccess();
          this.setAdminDetailsToLocalstorage();
        },
        (err) => {
          console.log(err.status);
          this.showToasterError();
        }
      );
  }
  isAdminLoggedIn() {
    localStorage.getItem('adminEmail') != null &&
      localStorage.getItem('role') != null;
  }

  showToasterSuccess() {
    this.notifyService.showSuccess('Login Successfully', 'Admin Login');
    this.headerService.isLoggedIn = true;
    setTimeout(() => {
      this.router.navigate(['admin/adminView']);
    }, 500);
    // this.adminLoginForm.reset();
  }

  showToasterError() {
    this.notifyService.showError('Invalid Credentials', 'Admin Login');
    this.adminLoginForm.reset();
  }
  setAdminDetailsToLocalstorage() {
    localStorage.setItem('adminEmail', this.adminLoginForm.value.email);
    // localStorage.setItem('adminPassword', this.adminLoginForm.value.password);
    localStorage.setItem('name', this.admin.firstName);
    localStorage.setItem('role', 'admin');
  }
}
