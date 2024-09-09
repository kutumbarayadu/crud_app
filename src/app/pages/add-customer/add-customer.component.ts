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

// Define types for validation results
interface ValidateName {
  isValid: boolean;
  failedField?: string;
}

enum SwalMessageTypes {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

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
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }
  nameValidator(control: any) {
    const namePattern = /^[A-Za-z\s-]+$/;
    if (!control.value || namePattern.test(control.value.trim())) {
      return null;
    }
    return { invalidName: true };
  }
  onSubmit() {
    // Check if the form is valid
    if (!this.customerForm.valid) {
      this.showMessage('Please correct the form.', SwalMessageTypes.Warning);
      return;
    }

    // Validate the first name field
    const firstName = this.customerForm.get('firstName')?.value;
    const firstNameValidation = this.nameValidator({ value: firstName });

    if (firstNameValidation?.invalidName) {
      Swal.fire('', 'Enter a valid first name.', 'warning');
      return;
    }

    // Validate the last name field
    const lastName = this.customerForm.get('lastName')?.value;
    const lastNameValidation = this.nameValidator({ value: lastName });

    if (lastNameValidation?.invalidName) {
      Swal.fire('', 'Enter a valid last name.', 'warning');
      return;
    }

    // Validate the phone number field
    const phoneNumber = this.customerForm.get('phoneNumber')?.value;
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      Swal.fire('', 'Enter a valid phone number (10 digits).', 'warning');
      return;
    }

    // If all validations pass, proceed to add the customer
    const customerData = this.customerForm.value;

    this.customerService.customersadd(customerData).subscribe(
      (res) => {
        console.log("Response:", res);
        Swal.fire({
          icon: 'success',
          title: 'Customer Added Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/customer');
      },
      (error) => {
        console.error('Error adding customer:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue adding the customer.',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }



  validateText(data: any): ValidateName {
    const textInputs = [
      { value: data.firstName, field: 'First Name' },
      { value: data.lastName, field: 'Last Name' },


    ];

    return this.nameValidate(textInputs) || { isValid: true };
  }

  // Function to validate each text input field
  nameValidate(textInputs: any[]): ValidateName {
    for (const input of textInputs) {
      if (!this.isTextValid(input.value)) {
        return { isValid: false, failedField: input.field };
      }
    }

    return { isValid: true };
  }

  // Function to check if the text input is valid
  isTextValid(areaName: string): boolean {
    const areaNameRegex = /^[A-Za-z\s-]+$/;
    const trimmedAreaName = areaName.trim();

    return areaNameRegex.test(trimmedAreaName);
  }

  // Function to build an error message based on the failed field
  buildErrorMessage(failedField: string): string {
    return `The ${failedField} is invalid.`;
  }

  // Function to display a SweetAlert2 message
  private showMessage(message: string, type: SwalMessageTypes) {
    Swal.fire('', message, type);
  }

  // Function to navigate to the customer list
  goToCustomers() {
    this.router.navigateByUrl('/customer');
  }
}
