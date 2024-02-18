import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PaymentComponent    
  ],
  imports: [        
    PaymentRoutingModule,
    SharedModule,
    //TextMaskModule
  ]  
})
export class PaymentModule { }
