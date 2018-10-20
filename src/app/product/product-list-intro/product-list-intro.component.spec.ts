import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListIntroComponent } from './product-list-intro.component';

describe('ProductListIntroComponent', () => {
  let component: ProductListIntroComponent;
  let fixture: ComponentFixture<ProductListIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
