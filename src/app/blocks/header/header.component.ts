import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { User } from '@core/users/user';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input()
  user: User;

  @Output()
  logoutEvent = new EventEmitter<any>();

  constructor() {}
}
