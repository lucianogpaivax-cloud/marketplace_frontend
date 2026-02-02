import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSelfeditComponent } from './seller-selfedit.component';

describe('SellerSelfeditComponent', () => {
  let component: SellerSelfeditComponent;
  let fixture: ComponentFixture<SellerSelfeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerSelfeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerSelfeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
