import { BrowserModule } from '@angular/platform-browser';
import { 
  LOCALE_ID, 
  NgModule 
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  NZ_DATE_LOCALE, 
  NZ_I18N 
} from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { ptBR } from 'date-fns/locale';
import { registerLocaleData } from '@angular/common';
import { 
  CurrencyMaskConfig, 
  CURRENCY_MASK_CONFIG 
} from 'ng2-currency-mask';
import pt from '@angular/common/locales/pt';
// import { NgxMaskModule } from 'ngx-mask';
import { 
  NzConfig, 
  NZ_CONFIG
} from 'ng-zorro-antd/core/config';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorComponent } from './pages/error/error.component';
import { StoreModule } from '@ngrx/store';
import { errorReducer } from './shared/store/reducers/error.reducer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LayoutModule } from './layout/layout.module';
// import { ChartsModule } from 'ng2-charts';

registerLocaleData(pt);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

const ngZorroConfig: NzConfig = {
  message: { 
    nzDuration: 5000,
    nzMaxStack: 1 
  },  
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,            
    FormsModule,
    HttpClientModule,
    NzSpaceModule,
    //LoadingBarRouterModule,   
    //NgxMaskModule.forRoot(),
    NzFormModule,
    SharedModule,
    StoreModule.forRoot({ errorState: errorReducer }, {}),
    LayoutModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_DATE_LOCALE, useValue: ptBR },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
