import { NgModule } from '@angular/core';
import { 
  Routes, 
  RouterModule
} from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { ErrorComponent } from './pages/error/error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TokenResolver } from './shared/services/resolver/token.resolver';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'login',    
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',        
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'dashboard',        
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)        
      }    
    ]
  },  
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
