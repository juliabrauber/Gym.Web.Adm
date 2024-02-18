import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
    FormsModule, 
    ReactiveFormsModule
} from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { SumPipe } from './pipes/sum.pipe';
import { UppercaseDirective } from './directives/uppercase.directive';
import { UtcDatePipe } from './pipes/utc-date.pipe';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { PaymentService } from './services/http/payment.service';
import { UtilsService } from './services/utils.service';
import { AlertHttpErrorInterceptor } from './interceptors/alert-http-error.interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TokenResolver } from './services/resolver/token.resolver';
import { CreditCardFlagComponent } from './components/credit-card-flag/credit-card-flag.component';
import { NgChartsModule } from 'ng2-charts';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    CpfCnpjPipe,
    HighlightPipe,
    PhonePipe,
    SortPipe,
    SumPipe,
    UppercaseDirective,
    UtcDatePipe,
    CreditCardFlagComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    NzCardModule,
    NzSpaceModule,
    NzTableModule,
    NzTypographyModule,
    NzTabsModule,
    NzIconModule,
    NzRadioModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzBadgeModule,
    NzModalModule,
    NzMessageModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    CpfCnpjPipe,
    HighlightPipe,
    PhonePipe,
    SortPipe,
    SumPipe,
    UppercaseDirective,
    UtcDatePipe,
    NzCardModule,
    NzSpaceModule,
    NzTableModule,
    NzTypographyModule,
    NzTabsModule,
    NzIconModule,
    NzRadioModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzBadgeModule,
    NzModalModule,
    NzMessageModule,
    NgChartsModule,
    NzCheckboxModule 
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: BasicAuthInterceptor, 
      multi: true 
    },   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AlertHttpErrorInterceptor,
      multi: true
    },
    UtilsService, 
    PaymentService,
    TokenResolver
  ]
})
export class SharedModule { }
