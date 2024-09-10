//import { MultpleAddressComponent } from './pages/multple-address/multple-address.component';
import { Routes } from '@angular/router';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomerAddressComponent } from './pages/customer-address/customer-address.component';
import { CustomerTabComponent } from './pages/customer-tab/customer-tab.component';
import { MultpleAddressComponent } from './pages/multple-address/multple-address.component';
import { AddmultipleAddressComponent } from './pages/addmultiple-address/addmultiple-address.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CustomerComponent } from './pages/customer/customer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'customer-address', component: CustomerAddressComponent },
  { path: 'multple-address', component: MultpleAddressComponent },
  { path: 'customer-tab', component: CustomerTabComponent },
  {path:'addmultiple-address',component:AddmultipleAddressComponent},
  {path:'orders', component:OrdersComponent},
  {path:'payment',component:PaymentComponent}
];
