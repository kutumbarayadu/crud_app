import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
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
  selector: 'app-multiple-addresspopup',
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
  templateUrl: './multiple-addresspopup.component.html',
  styleUrl: './multiple-addresspopup.component.scss',
})
export class MultipleAddresspopupComponent {
  customerForm!: FormGroup;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MultipleAddresspopupComponent>,
    private fb: FormBuilder,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute
  ) {}
  id: string | null = null;
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required]],
      country: ['', Validators.required],
      pincode: ['', [Validators.required]],
    });
    this.getsingleAdd(this.data);
  }

  goBack() {
    this.dialogRef.close();
  }

  getsingleAdd(id: any) {
    this.customerService.getsingleAddress(id).subscribe(
      (data: any) => {
        this.customerForm.patchValue(data);
        console.log('Customer data:::::::::::::', data);
      },
      (error: any) => {
        console.error('Error fetching customers:', error);
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
    const street = this.customerForm.get('street')?.value;
    const streetValidation = this.nameValidator({ value: street });

    if (streetValidation?.invalidName) {
      Swal.fire('', 'Enter a valid street.', 'warning');
      return;
    }
    const state = this.customerForm.get('state')?.value;
    const stateValidation = this.nameValidator({ value: state});

    if (stateValidation?.invalidName) {
      Swal.fire('', 'Enter a valid state.', 'warning');
      return;
    }

    const city = this.customerForm.get('city')?.value;
    const cityValidation = this.nameValidator({ value: city});

    if (cityValidation?.invalidName) {
      Swal.fire('', 'Enter a valid city.', 'warning');
      return;
    }
    const country = this.customerForm.get('country')?.value;
    const countryValidation = this.nameValidator({ value: country});

    if (countryValidation?.invalidName) {
      Swal.fire('', 'Enter a valid country.', 'warning');
      return;
    }
    const pincode= this.customerForm.get('pincode')?.value;
    if (!/^[0-9]{6}$/.test(pincode)) {
      Swal.fire('', 'Enter a valid pincode (6 digits).', 'warning');
      return;
    }
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      customerData.id = this.data;
      this.customerService
        .updatesingleAddress(this.data, customerData)
        .subscribe(
          (res) => {
            Swal.fire("update succesfully")
            this.dialogRef.close();
          },
          (error) => {
            Swal.fire("Error updating customer")
          }
        );
    }
  }
}
