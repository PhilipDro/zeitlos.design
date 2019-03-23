import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsCollectorComponent } from './order-details-collector.component';

describe('OrderDetailsCollectorComponent', () => {
  let component: OrderDetailsCollectorComponent;
  let fixture: ComponentFixture<OrderDetailsCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsCollectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
