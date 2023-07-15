import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private baseURL = 'http://localhost:8082';

  //check and get User, is user present for this email and password

  getUser(email: any, password: any) {
    return this.http.get<any>(`${this.baseURL}/userlogin/${email}/${password}`);
  }

  //user registration
  postUserRegistration(data: any) {
    console.log(data);
    return this.http.post<{ obj: any }>(`${this.baseURL}/registration`, data, {
      headers: new HttpHeaders({ 'custom-header': 'register user' }),
      observe: 'response',
    });
    // return this.http.post(this.userRegisterURL, data);
  }

  isUserLoggedIn() {
    return (
      localStorage.getItem('userEmail') != null &&
      localStorage.getItem('role') != null
    );
  }
}
