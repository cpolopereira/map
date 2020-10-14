import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './_pages/index/index.component';


const routes: Routes = [
  {
    path: ':lat/:lng',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '-33.45/-70.66667'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
