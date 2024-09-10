import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customersservice';
import Swal from 'sweetalert2';
enum SwalMessageTypes {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}
@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [CustomerService],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.scss',
})
export class CustomerAddressComponent implements OnInit {
  customerForm!: FormGroup;
  customerId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      console.log('params', params);
      this.customerId = history.state.customerId;
      this.loadCustomerData(this.customerId);
    });
    console.log('customerId::::::::', this.customerId);
    this.customerForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }

  loadCustomerData(customerId: any): void {
    this.customerService.getCustomerAdressById(customerId).subscribe(
      (data) => {
        this.customerForm.patchValue(data);
        console.log('console', console);
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

  update(): void {
    if (!this.customerForm.valid) {
      this.showMessage('Please correct the form.', SwalMessageTypes.Warning);
      return;
    }
    const street = this.customerForm.get('street')?.value;
    const streetValidation = this.nameValidator({ value: street });

    if (streetValidation?.invalidName) {
      Swal.fire('', 'Enter a valid street.', 'warning');
      return;
    }
    const city = this.customerForm.get('city')?.value;
    const cityValidation = this.nameValidator({ value: city });

    if (cityValidation?.invalidName) {
      Swal.fire('', 'Enter a valid city.', 'warning');
      return;
    }
    const country = this.customerForm.get('country')?.value;
    const countryValidation = this.nameValidator({ value: country });

    if (countryValidation?.invalidName) {
      Swal.fire('', 'Enter a valid country.', 'warning');
      return;
    }
    const state = this.customerForm.get('state')?.value;
    const stateValidation = this.nameValidator({ value: state });

    if (stateValidation?.invalidName) {
      Swal.fire('', 'Enter a valid state.', 'warning');
      return;
    }

    const phoneNumber = this.customerForm.get('pincode')?.value;
    if (!/^[0-9]{6}$/.test(phoneNumber)) {
      Swal.fire('', 'Enter a valid pincode (6 digits).', 'warning');
      return;
    }

    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.customerService
        .updatecustomers(this.customerId, customerData)
        .subscribe(
          (res) => {
            console.log('Customer updated successfully', res);
            this.router.navigateByUrl('/customer');
          },
          (error) => {
            console.error('Error updating customer:', error);
          }
        );
    }
  }
  private showMessage(message: string, type: SwalMessageTypes) {
    Swal.fire('', message, type);
  }
  goToCustomers() {
    this.router.navigateByUrl('/customer');
    //this.router.navigate(['/customer'])
  }
}
