import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  productList: any = [];
  filterProductList: any = [];
  productBrands = new Set();
  selectedBrand: any;
  searchData: any = [];
  role: boolean = false;
  constructor(private productService: ProductService) {
    this.productService.getProductBrand().subscribe((data) => {
      this.setBrands(data);
    });
  }

  setBrands(datas) {
    for (let data of datas) {
      this.productBrands.add(data.productBrand);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('name')) {
      console.log('name', localStorage.getItem('name'));
      this.isUserLoggedIn = true;
    }
    // if (localStorage.getItem('role') == 'admin') {
    //   console.log('admin present');
    //   this.role = true;
    // }
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.productList = data;
    });
  }
  productSearchForm = new FormGroup({
    productcode: new FormControl('', [Validators.required]),
    productname: new FormControl('', [Validators.required]),
    productbrand: new FormControl('', [Validators.required]),
  });

  get productcode() {
    return this.productSearchForm.get('productcode');
  }
  get productname() {
    return this.productSearchForm.get('productname');
  }
  get productbrand() {
    return this.productSearchForm.get('productbrand');
  }

  productSearch() {
    this.productService
      .searchProduct(
        this.productSearchForm.value.productname,
        this.productSearchForm.value.productcode,
        this.productSearchForm.value.productbrand
      )
      .subscribe((data) => {
        console.log(data);
        this.productList = data;
        this.searchData = data;
        console.log(this.searchData);
      });
  }

  onSelectedBrand(event) {
    this.selectedBrand = event;
    this.productService
      .searchProduct(null, null, this.selectedBrand)
      .subscribe((data) => {
        console.log(data);
        this.productList = data;
        this.searchData = data;
      });
  }

  priceFilterForm = new FormGroup({
    startprice: new FormControl('', [Validators.required, Validators.min(1)]),
    endprice: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  getProductsAfterPriceFilter() {
    let startPrice = this.priceFilterForm.value.startprice;
    let endPrice = this.priceFilterForm.value.endprice;
    this.filterProductList = [];
    for (let product of this.searchData) {
      if (
        product.productPrice >= startPrice &&
        product.productPrice <= endPrice
      ) {
        this.filterProductList.push(product);
      }
    }
    this.productList = this.filterProductList;
    // this.priceFilterForm.reset();
  }
}
