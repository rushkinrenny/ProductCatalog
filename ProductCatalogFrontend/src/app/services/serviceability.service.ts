import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceabilityService {
  serviceability: any;
  baseURL = 'http://localhost:8082/service';
  constructor(private http: HttpClient) {}

  addServiceability(formData: FormData) {
    return this.http.post(`${this.baseURL}`, formData);
  }
  getServiceability(pincode, productcode) {
    return this.http.get(`${this.baseURL}/${pincode}/${productcode}`);
  }
}
