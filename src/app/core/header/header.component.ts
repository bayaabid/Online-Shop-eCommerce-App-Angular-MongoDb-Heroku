import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/core/user';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  user: User;

  @Output()
  logoutEvent = new EventEmitter<any>();

  constructor() {}
}
