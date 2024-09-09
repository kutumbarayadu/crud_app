
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator'; // Updated to MatPaginatorModule
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CustomerAddressComponent } from "../customer-address/customer-address.component";
import { EditCustomerComponent } from "../edit-customer/edit-customer.component";
import { MultpleAddressComponent } from "../multple-address/multple-address.component";
import { OrdersComponent } from "../orders/orders.component";
import { PaymentComponent } from "../payment/payment.component";
// Corrected import
//i//mport { CustomerService } from '../../services/customer.service'; // Updated the service import

@Component({
  selector: 'app-customer-tab',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatPaginatorModule, // Updated to MatPaginatorModule
    MatFormFieldModule,
    MatTabsModule, // Added MatTabsModule
    MatCardModule, // Added MatCardModule
    ReactiveFormsModule, // Added ReactiveFormsModule
    EditCustomerComponent,
    CustomerAddressComponent,
    CustomerAddressComponent,
    MultpleAddressComponent,
    OrdersComponent,
    PaymentComponent
],
  templateUrl: './customer-tab.component.html',
  styleUrls: ['./customer-tab.component.scss'] // Corrected styleUrls
})
export class CustomerTabComponent {
  constructor(private router: Router, ) {}

  button() {
    this.router.navigateByUrl('/add-customer');
  }

  home() {
    this.router.navigateByUrl('/welcome');
  }
}
