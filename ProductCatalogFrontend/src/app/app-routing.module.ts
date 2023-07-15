import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ShowProductDetailsComponent } from './components/show-product-details/show-product-details.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AddServiceabilityComponent } from './admin/add-serviceability/add-serviceability.component';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { UserAuthGuard } from './guard/user-auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'userlogin',
    component: UserLoginComponent,
  },

  {
    path: 'adminlogin',
    component: AdminLoginComponent,
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'userlogin/showproducts',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
  },

  {
    path: 'showProductDetails/:productcode',
    component: ShowProductDetailsComponent,
    // canActivate: [AdminAuthGuard, UserAuthGuard],
  },
  {
    path: 'admin/adminView/addServiceability/:productcode',
    component: AddServiceabilityComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/adminView',
    component: AdminViewComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
