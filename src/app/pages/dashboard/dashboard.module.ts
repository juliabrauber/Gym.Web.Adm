import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
