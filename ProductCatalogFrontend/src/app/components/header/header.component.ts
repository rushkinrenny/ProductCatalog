import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string;
  role: string;
  constructor(private router: Router) {
    if (localStorage.getItem('name')) {
      this.name = localStorage.getItem('name');
      this.role = localStorage.getItem('role');
      this.isLoggedIn = true;
    }
    // this.isLoggedIn = this.headerService.isLoggedIn;
    console.log(this.isLoggedIn);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  ngOnInit(): void {}
}
