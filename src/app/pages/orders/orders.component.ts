import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customersservice';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-orders',
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
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  displayedColumns: string[] = ['order_id', 'order_date', 'status', 'total_amount','payment_method',];
  customerId: string | null = null;
  customerForm: any;
  orders:any

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
        this.orders = data.orders;

      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );

  }
}
