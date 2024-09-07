import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customersservice';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [CustomerService],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
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
  }


  goToCustomers() {
    this.router.navigateByUrl('/customer');
  }
}
