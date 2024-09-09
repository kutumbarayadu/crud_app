import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../services/customersservice';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [CustomerService],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  displayedColumns: string[] = ['payment_id', 'order_id', 'amount', 'payment_method','payment_status','payment_date'];
  payments:any
  customerId: string | null = null;
  constructor(private router: Router, private customerService: CustomerService,private route: ActivatedRoute) {}
  ngOnInit(): void {

   this.route.params.subscribe(async (params) => {
    console.log("params",params)
    this.customerId = history.state.customerId;

  });
   this.getorders( this.customerId)
  }


  getorders(customerId:any) {
    this.customerService.getorders(customerId).subscribe(
      (data) => {
        console.log('orders', data);
        this.payments = data.payments;
        console.log("payments",this.payments)
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );

  }
}
