import { NgModule } from '@angular/core';

import { CieloCallbackRoutingModule } from './cielo-callback-routing.module';
import { CieloCallbackComponent } from './cielo-callback.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CieloCallbackComponent
  ],
  imports: [   
    CommonModule, 
    CieloCallbackRoutingModule,
    SharedModule
  ]
})
export class CieloCallbackModule { }
