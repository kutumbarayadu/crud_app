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
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
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
  update(): void {

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
