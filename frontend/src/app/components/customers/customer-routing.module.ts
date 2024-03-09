import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { EditComponent } from './customer-form/customer-form.component';

const routes: Routes = [
    {
        path: "",
        component: CustomersComponent
    },
    {
        path: "customer",
        component: EditComponent
    },
    {
        path: "customer/:id",
        component: EditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
