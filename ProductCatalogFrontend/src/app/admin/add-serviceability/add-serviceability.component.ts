import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ServiceabilityService } from 'src/app/services/serviceability.service';
@Component({
  selector: 'app-add-serviceability',
  templateUrl: './add-serviceability.component.html',
  styleUrls: ['./add-serviceability.component.css'],
})
export class AddServiceabilityComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceabilityService: ServiceabilityService,
    private notifyService: NotificationService
  ) {}
  productCode: string;
  ngOnInit(): void {}

  serviceabilityForm = new FormGroup({
    pincode: new FormControl('', [Validators.required]),
    expectedDeliveryTime: new FormControl('', [Validators.required]),
  });

  get pincode() {
    return this.serviceabilityForm.get('pincode');
  }
  get expectedDeliveryTime() {
    return this.serviceabilityForm.get('expectedDeliveryTime');
  }

  addServiceability() {
    this.productCode = this.activatedRoute.snapshot.params['productcode'];
    const formData = new FormData();
    formData.append('productcode', this.productCode);
    formData.append('pincode', this.serviceabilityForm.value.pincode);
    formData.append(
      'expectedDeliveryTime',
      this.serviceabilityForm.value.expectedDeliveryTime
    );
    this.serviceabilityService.addServiceability(formData).subscribe(
      (response) => {
        this.showToasterSuccess();
      },
      (err) => {
        console.log(err.status);
        this.showToasterError();
      }
    );
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Pincode Added Successfully',
      'Serviceability'
    );
    this.serviceabilityForm.reset();
  }

  showToasterError() {
    this.notifyService.showError('Pincode Already Exist', 'Serviceability');
    this.serviceabilityForm.reset();
  }
}
