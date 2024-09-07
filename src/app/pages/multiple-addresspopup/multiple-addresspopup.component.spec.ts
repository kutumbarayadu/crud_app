import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAddresspopupComponent } from './multiple-addresspopup.component';

describe('MultipleAddresspopupComponent', () => {
  let component: MultipleAddresspopupComponent;
  let fixture: ComponentFixture<MultipleAddresspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleAddresspopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleAddresspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
