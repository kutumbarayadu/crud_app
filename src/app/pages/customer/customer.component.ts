
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../../services/customersservice';
import { customers } from '../../entites/customers';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatPaginator,
    MatFormFieldModule
  ],
  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent  implements AfterViewInit {

  displayedColumns: string[] = ['customer_id', 'first_name', 'last_name', 'phone_number', 'street','city','state','country','pincode', 'edit','delete'];
  dataSource = new MatTableDataSource<any,MatPaginator>([]);
  customerForm: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  constructor(private router: Router, private customerService: CustomerService) {}

  ngOnInit(): void {
    console.log("Customers loaded");
  // this.getCustomers();
   this.getCustomersAddress();
  }
  button() {
    this.router.navigateByUrl('/add-customer');
  }
  home() {
    this.router.navigateByUrl('/welcome');
  }
  customer() {
    this.router.navigateByUrl('/customer');
  }
  editCustomer(element: any) {
    this.router.navigate(['/edit-customer', element.id]);
  }
  customeradress(element:any){
    this.router.navigate(['/customeradress', element.id]);
  }

  getCustomersAddress(){
    this.customerService.getCustomersAddress().subscribe(
      (data)=>{

       // this.dataSource = data;
       this.dataSource.data = data;
       console.log("data",this.dataSource)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );

  }

  deleteCustomer(customer_id: any): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customer_id).subscribe(
        (response) => {
          console.log('Customer deleted successfully:', response);

          this.dataSource.data = this.dataSource.data.filter(
            (customer: any) => customer.customer_id == customer_id
          );
        },
        (error) => {
          console.error('Error deleting customer:', error);
        }
      );
    }
  }
  navigateToEditCustomer(id: string){
    this.router.navigate(['/customer-tab'], {
      state: { customerId:id},
    });
  }

}
