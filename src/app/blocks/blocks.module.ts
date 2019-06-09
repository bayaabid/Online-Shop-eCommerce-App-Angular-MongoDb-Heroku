import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './root/app.component';

@NgModule({
  declarations: [HeaderComponent, AppComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent, AppComponent]
})
export class BlocksModule {}
