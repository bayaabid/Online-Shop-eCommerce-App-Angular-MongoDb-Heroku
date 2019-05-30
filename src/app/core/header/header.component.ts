import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/user';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptions = [];
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authService.findMe().subscribe(user => (this.user = user))
    );

    this.subscriptions.push(
      this.authService.user.subscribe(user => (this.user = user))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
