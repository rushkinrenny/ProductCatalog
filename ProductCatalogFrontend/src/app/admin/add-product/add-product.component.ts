import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private notifyService: NotificationService
  ) {}
  statusCode: any;
  ngOnInit(): void {}
  addProductForm = new FormGroup({
    productcode: new FormControl('', [Validators.required]),
    productname: new FormControl('', [Validators.required]),
    productbrand: new FormControl('', [Validators.required]),
    productdetails: new FormControl('', [Validators.required]),
    productprice: new FormControl('', [Validators.required, Validators.min(1)]),
    productimage: new FormControl('', Validators.required),
  });

  get productcode() {
    return this.addProductForm.get('productcode');
  }
  get productname() {
    return this.addProductForm.get('productname');
  }
  get productbrand() {
    return this.addProductForm.get('productbrand');
  }
  get productdetails() {
    return this.addProductForm.get('productdetails');
  }
  get productprice() {
    return this.addProductForm.get('productprice');
  }
  get productimage() {
    return this.addProductForm.get('productimage');
  }

  selectedFile: File;
  formData: FormData;

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  addProduct() {
    this.formData = new FormData();
    this.formData.append('productcode', this.addProductForm.value.productcode);
    this.formData.append('productname', this.addProductForm.value.productname);
    this.formData.append(
      'productbrand',
      this.addProductForm.value.productbrand
    );
    this.formData.append(
      'productdetails',
      this.addProductForm.value.productdetails
    );
    this.formData.append(
      'productprice',
      this.addProductForm.value.productprice
    );
    this.formData.append('image', this.selectedFile);
    this.productService.addProduct(this.formData).subscribe(
      (response) => {
        console.log(response);
        console.log(response.status);

        if (response.status == 201) {
          console.log('product added succesfully');

          this.showToasterSuccess();
        }
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error, ' productcode already available');

        this.showToasterError();
      }
    );
  }
  showToasterSuccess() {
    this.notifyService.showSuccess('product added succesfully', 'Product');
    this.addProductForm.reset();
  }

  showToasterError() {
    console.log('ok');
    this.notifyService.showError('productcode already available', 'Product');
    this.addProductForm.reset();
  }
  isAdminPresent;
}
