import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  productList: any = [];
  productBrands = new Set();
  selectedBrand: any;
  constructor(
    private productService: ProductService,
    private adminService: AdminService
  ) {
    this.productService.getProductBrand().subscribe((data) => {
      this.setBrands(data);
    });
    this.adminService.getAllProducts().subscribe((response) => {
      this.productList = response;
    });
  }

  ngOnInit(): void {}

  setBrands(datas) {
    for (let data of datas) {
      this.productBrands.add(data.productBrand);
    }
  }
  onSelectedBrand(event) {
    this.selectedBrand = event;
    this.productService
      .searchProduct(null, null, this.selectedBrand)
      .subscribe((data) => {
        console.log(data);
        this.productList = data;
      });
  }
}
