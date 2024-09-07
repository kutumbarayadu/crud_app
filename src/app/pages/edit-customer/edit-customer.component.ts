import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customersservice';
import { HttpClientModule } from '@angular/common/http';
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
onSubmit() {
throw new Error('Method not implemented.');
}
  customerForm!: FormGroup;
  customerId: string | null = null;
  constructor(private fb: FormBuilder,private router: Router,private customerService: CustomerService,private route: ActivatedRoute) {}
  ngOnInit(): void {
   // this.route.paramMap.subscribe(params => {
    //  this.customerId = params.get('id')

  //});
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


  update(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.customerService.updatecustomers(this.customerId, customerData).subscribe(
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
  goToCustomers() {
    this.router.navigateByUrl('/customer');
  }
  }
