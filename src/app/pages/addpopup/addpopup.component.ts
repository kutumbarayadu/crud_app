import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customersservice';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-addpopup',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [CustomerService], // Add this line
  templateUrl: './addpopup.component.html',
  styleUrls: ['./addpopup.component.scss'],
})
export class AddpopupComponent {
navigateToEditCustomer(arg0: any) {
throw new Error('Method not implemented.');
}

  customerForm!: FormGroup;
  customerId: string ='';
  is_default: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log('customerId::::::::', this.data);

    this.customerForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }
  goToCustomers() {
    this.router.navigateByUrl('/multple');
  //this.router.navigate(['/customer'])

 }
  onsubmit() {
    if (this.customerForm.valid) {
      const addressData = this.customerForm.value;
     addressData.customerId=this.data
     addressData.isDefault=this.is_default
    //  const add ={
    //    street:"jntu",
    //    city:"hyd",
    //    state:"telangana",
    //    country:"india",
    //    pincode:'"455050',
    //    customerId:"595949393",
    //    isDefault:false
    //  }
    console.log("addressData",addressData)
      this.customerService.addresscreate(addressData).subscribe(
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
          this.router.navigateByUrl('/customer');
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
}
