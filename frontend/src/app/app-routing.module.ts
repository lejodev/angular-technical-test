import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./components/customers/customers.module')
      .then(m => m.CustomersModule)
  },
  {
    path: "test",
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
