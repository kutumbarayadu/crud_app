import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmultipleAddressComponent } from './addmultiple-address.component';

describe('AddmultipleAddressComponent', () => {
  let component: AddmultipleAddressComponent;
  let fixture: ComponentFixture<AddmultipleAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmultipleAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmultipleAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
