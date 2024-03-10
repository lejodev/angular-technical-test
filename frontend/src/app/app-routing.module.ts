import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './components/test/test.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./components/customers/customers.module')
      .then(m => m.CustomersModule)
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
