import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmultiple-address',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule
  ],
  templateUrl: './addmultiple-address.component.html',
  styleUrl: './addmultiple-address.component.scss'
})
export class AddmultipleAddressComponent {
update() {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
  customerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    //private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      street: [  '', Validators.required],
      city: [ '', Validators.required],
      state: [ '', Validators.required],
      country: ['', Validators.required],
      pincode: [ '', Validators.required],
    });
  }
  goToCustomers() {
    this.router.navigateByUrl('/multple-address');
  //this.router.navigate(['/customer'])

 }
}
