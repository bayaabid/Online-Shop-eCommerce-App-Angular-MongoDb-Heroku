import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [],
  imports: [CommonModule, PmMaterialModule, FlexLayoutModule],
  exports: [
    PmMaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
