import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnComponent } from './return.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReturnRoutingModule } from './return-routing.module';

@NgModule({
  declarations: [
    ReturnComponent
  ],
  imports: [  
    CommonModule,  
    ReturnRoutingModule,
    SharedModule
  ]  
})
export class ReturnModule { }
