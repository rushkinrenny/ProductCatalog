import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, AppRoutingModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
