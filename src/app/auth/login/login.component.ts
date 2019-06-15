import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "pm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email: string;
  error: BehaviorSubject<string>;
  password: string;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.error = new BehaviorSubject('')
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      s => this.router.navigate([""]),
      e => {
        console.log("e", e);
        this.error.next(e);
      }
    );
  }
}
