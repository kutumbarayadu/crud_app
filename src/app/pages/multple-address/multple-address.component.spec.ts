import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultpleAddressComponent } from './multple-address.component';

describe('MultpleAddressComponent', () => {
  let component: MultpleAddressComponent;
  let fixture: ComponentFixture<MultpleAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultpleAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultpleAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
