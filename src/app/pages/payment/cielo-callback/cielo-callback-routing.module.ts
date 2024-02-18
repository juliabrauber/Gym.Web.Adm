import { NgModule } from '@angular/core';
import { 
    Routes, 
    RouterModule 
} from '@angular/router';
import { CieloCallbackComponent } from './cielo-callback.component';

const routes: Routes = [
    { 
        path: '', 
        component: CieloCallbackComponent 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CieloCallbackRoutingModule { }
