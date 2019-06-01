import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  error: string;
  password: string;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.error = '';
    this.authService
      .login(this.email, this.password)
      .subscribe(s => this.router.navigate(['']), e => (this.error = e));
  }
}
