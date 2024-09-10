import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customersservice';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

enum SwalMessageTypes {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}
@Component({
  selector: 'app-edit-customer',
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
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent  implements OnInit{


  customerForm!: FormGroup;
  originalValues:any
  customerId: string | null = null;
  constructor(private fb: FormBuilder,private router: Router,private customerService: CustomerService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      console.log("params",params)
      this.customerId = history.state.customerId;
    });
    console.log("customerId::::::::", this.customerId)
    this.loadCustomerData( this.customerId)
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required],

    });
  }

  loadCustomerData(customerId:any): void {
    this.customerService.getCustomerById(customerId).subscribe(
      (data) => {
        this.customerForm.patchValue(data);
      console.log("console",console)
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );

  }
  nameValidator(control: any) {
    const namePattern = /^[A-Za-z\s-]+$/;
    if (!control.value || namePattern.test(control.value.trim())) {
      return null;
    }
    return { invalidName: true };
  }
  private showMessage(message: string, type: SwalMessageTypes) {
    Swal.fire('', message, type);
  }
  update(): void {
    if (!this.customerForm.valid) {
      this.showMessage('Please correct the form.', SwalMessageTypes.Warning);
      return;
    }
    const firstname = this.customerForm.get('firstname')?.value;
    const firstnameValidation = this.nameValidator({ value: firstname });
    if (firstnameValidation?.invalidName) {
      Swal.fire('', 'Enter a valid first name.', 'warning');
      return;
    }
    const email = this.customerForm.get('email')?.value;
    const lastname = this.customerForm.get('lastname')?.value;
    const lastnameValidation = this.nameValidator({ value: lastname });

    if (lastnameValidation?.invalidName) {
      Swal.fire('', 'Enter a valid last name.', 'warning');
      return;
    }

    const phonenumber = this.customerForm.get('phonenumber')?.value;
    if (!/^[0-9]{10}$/.test(phonenumber)) {
      Swal.fire('', 'Enter a valid phone number (10 digits).', 'warning');
      return;
    }
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.customerService.updatecustomers(this.customerId, customerData).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Customer updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/customer');
        },
        (error) => {
          console.error('Error updating customer:', error);
          if (error.status === 409 && error.error.error === 'Duplicate Email Address') {
            Swal.fire({
              icon: 'warning',
              title: 'Error',
              text: 'Email Id already exists.',
              confirmButtonText: 'Try Again'
            });
          }
        }
      );
    }
  }


  goToCustomers() {
    this.router.navigateByUrl('/customer');
  }
}






