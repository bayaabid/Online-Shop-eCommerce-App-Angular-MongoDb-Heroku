import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { User } from "./core/user";
import { Subscription } from "rxjs";

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  user: User;
  userSubscription: Subscription;

  constructor() {
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
