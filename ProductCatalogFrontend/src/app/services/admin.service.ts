import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  private baseURL = 'http://localhost:8082';
  getAdmin(email: any, password: any) {
    return this.http.get<any>(
      `${this.baseURL}/adminlogin/${email}/${password}`
    );
  }

  getAllProducts() {
    return this.http.get<any>(`${this.baseURL}/allproducts`);
  }

  isAdminLoggedIn() {
    return (
      localStorage.getItem('adminEmail') != null &&
      localStorage.getItem('role') != null
    );
  }
}
