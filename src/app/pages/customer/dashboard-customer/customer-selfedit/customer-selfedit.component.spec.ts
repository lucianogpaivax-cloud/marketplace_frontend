import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelfeditComponent } from './customer-selfedit.component';

describe('CustomerSelfeditComponent', () => {
  let component: CustomerSelfeditComponent;
  let fixture: ComponentFixture<CustomerSelfeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSelfeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSelfeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
