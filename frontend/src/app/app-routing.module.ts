import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./components/customers/customers.module')
      .then(m => m.CustomersModule)
  },
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
