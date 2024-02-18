import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from './menu/menu.component';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzAvatarModule,
    NzDropDownModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule
  ],
  exports:[
    LayoutComponent,
    MenuComponent
  ]
})
export class LayoutModule { }
