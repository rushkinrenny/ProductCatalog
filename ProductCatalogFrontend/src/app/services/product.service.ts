import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  data: any;
  productBrands: any;
  constructor(private http: HttpClient) {}
  private baseURL = 'http://localhost:8082/products';
  private getAullProductsURL = 'http://localhost:8082/allproducts';
  searchProduct(productname: any, productcode: any, productbrand: any) {
    return this.http.get<any>(
      `${this.baseURL}?productname=${productname}&productcode=${productcode}&productbrand=${productbrand}`
    );
    // return this.http.post<{ obj: any }>(this.userRegisterURL, data, {
    //   headers: new HttpHeaders({ 'custom-header': 'register user' }),
    //   observe: 'response',
    // });
  }

  addProduct(formData: FormData) {
    return this.http.post(`${this.baseURL}`, formData, {
      observe: 'response',
    });

    // return this.http.post<{ obj: any }>(this.userRegisterURL, data, {
    //   headers: new HttpHeaders({ 'custom-header': 'register user' }),
    //   observe: 'response',
    // });
  }

  showProduct(productcode) {
    return this.http.get<any>(`${this.baseURL}/${productcode}`);
  }

  getAllProducts() {
    return this.http.get(this.getAullProductsURL);
  }
  getProductBrand() {
    this.http
      .get(this.getAullProductsURL)
      .subscribe((data) => (this.productBrands = data));
    console.log('brand : ', this.productBrands);
    return this.http.get(this.getAullProductsURL);
  }
}
