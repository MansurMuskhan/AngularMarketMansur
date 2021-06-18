import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  {path: '', component:AppComponent},
  {path: 'basket', component:BasketComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
