import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, PmMaterialModule],
  exports: [PmMaterialModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SharedModule {}
