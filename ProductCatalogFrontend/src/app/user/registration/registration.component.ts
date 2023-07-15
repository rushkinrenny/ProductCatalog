import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmedValidator } from 'src/app/classes/confirmed.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  title = 'Registration';
  statusCode: any;
  registrationForm: FormGroup = new FormGroup({});
  constructor(
    private userService: UserService,
    private router: Router,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.registrationForm = formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z.]+$')],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),

            Validators.minLength(8),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }
  ngOnInit(): void {}

  get f() {
    return this.registrationForm.controls;
  }

  userRegister() {
    this.userService
      .postUserRegistration(this.registrationForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          console.log(response.status);

          if (response.status == 201) {
            console.log('User register success');

            this.showToasterSuccess();
          }
        },
        (error: HttpErrorResponse) => {
          console.log('User already registered', error.status);
          this.showToasterError();
        }
      );
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(
      'User Register Successfully',
      'Registration'
    );
    this.registrationForm.reset();
  }

  showToasterError() {
    console.log('ok');
    this.notifyService.showError('User Aleardy Register', 'Registration');
    this.registrationForm.reset();
  }
}
