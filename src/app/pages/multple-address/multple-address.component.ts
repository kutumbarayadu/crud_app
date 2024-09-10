
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomerService } from '../../services/customersservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddpopupComponent } from '../addpopup/addpopup.component';
import Swal from 'sweetalert2';
import { MultipleAddresspopupComponent } from '../multiple-addresspopup/multiple-addresspopup.component';
@Component({
  selector: 'app-multple-address',
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
  templateUrl: './multple-address.component.html',
  styleUrls: ['./multple-address.component.scss'],
})
export class MultpleAddressComponent implements OnInit, AfterViewInit {
  multipleAddress: any;
customer() {
  this.router.navigateByUrl('/');
}
navigateToEditCustomer() {
}
  displayedColumns: string[] = ['street', 'city', 'state', 'country', 'pincode', 'edit','is_default',];
  dataSource: any;
  customerId: string | null = null;
  customerForm: any;

  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute,private dialog: MatDialog) {}
  async ngOnInit() {
    console.log('Address loaded');
    this.route.params.subscribe(async (params) => {
      console.log("params",params)
      this.customerId = history.state.customerId;
    });
    console.log("customerId::::::::", this.customerId)
   await this.getmultple(this.customerId);
  }

  ngAfterViewInit() {}
  getmultple(customerid: any) {
    this.customerService.getmultipleAddress(customerid).subscribe(
      (data: any) => {
        console.log('Customer data:::::::::::::', data);
        this.multipleAddress=data;
        this.dataSource = new MatTableDataSource(data);
      },
      (error: any) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  async toggleDefaultStatus(element: any): Promise<void> {
    if( !element.is_default ){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'this Address is already as default.',
        confirmButtonText: 'Try Again'
      });
      return
    }else{
      const result = await Swal.fire({
        title: 'Are you sure you want to update this as default Address ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });
      if(!result.isConfirmed){
        return
      }

    console.log("else element",element)

   const payLoad =  {
      id : element.id,
      customerId : element.customer_id,
      }
      this.customerService.updateDefaultAddress(payLoad).subscribe(
        (res) => {
          console.log('res', res);

          // Show success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Customer Added Successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          // Optionally, navigate to another page
           this.getmultple(this.customerId);
        //  this.router.navigateByUrl('/customer');
        },
        (error) => {
          console.error('Error adding customer:', error);

          // Show error message using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an issue adding the customer.',
            confirmButtonText: 'Try Again',
          });
        }
      );
    }

  }

  openAddAddressDialog(): void {
    const dialogRef = this.dialog.open(AddpopupComponent, {
      width: '400px',
      data:  this.customerId ,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getmultple(this.customerId);
      }
    });
  }
  openAddAddressDia(id: number): void {
console.log("id",id)
    const dialogRef = this.dialog.open(MultipleAddresspopupComponent, {
      width: '400px',
      data:  id ,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getmultple(this.customerId);
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getmultple(this.customerId);
      }
    });
  }

onSubmit() {
    //  this.router.navigateByUrl('/customer');
      // firstName, lastName, phoneNumber, email
      if (this.customerForm.valid) {
        const customerData = this.customerForm.value;

        this.customerService.customersadd(customerData).subscribe(
          (res) => {
            console.log("res", res);

            // Show success message using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Customer Added Successfully',
              showConfirmButton: false,
              timer: 1500
            });

            // Optionally, navigate to another page
             this.router.navigateByUrl('/customer');
          },
          (error) => {
            console.error('Error adding customer:', error);

            // Show error message using SweetAlert2
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'There was an issue adding the customer.',
              confirmButtonText: 'Try Again'
            });
          }
        );
      }
    }}
