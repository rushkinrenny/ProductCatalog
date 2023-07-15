import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceabilityService } from '../../services/serviceability.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  product: any;
  isAvailable = 0;
  serviceability: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private serviceabilityService: ServiceabilityService
  ) {
    this.isAvailable = 0;
  }

  deliverableForm = new FormGroup({
    pincode: new FormControl('', Validators.required),
  });

  checkServiceabiliy() {
    console.log(this.deliverableForm.value.pincode);
    this.serviceabilityService
      .getServiceability(
        this.deliverableForm.value.pincode,
        this.activateRoute.snapshot.params['productcode']
      )
      .subscribe(
        (response) => {
          this.isAvailable = 1;
          this.serviceability = response;
          console.log(this.serviceability);
        },
        (error) => {
          this.isAvailable = 2;
        }
      );
  }

  getDeliveryDate(noOfDays) {
    let date = new Date();
    date.setDate(date.getDate() + noOfDays);
    return date.toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    // console.log(this.activateRoute.snapshot.params['productcode']);
    this.productService
      .showProduct(this.activateRoute.snapshot.params['productcode'])
      .subscribe((singleProduct) => {
        this.product = singleProduct;
      });
  }
}
