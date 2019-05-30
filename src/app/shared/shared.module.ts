import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmMaterialModule } from './material-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PmMaterialModule],
  exports: [PmMaterialModule]
})
export class SharedModule {}
