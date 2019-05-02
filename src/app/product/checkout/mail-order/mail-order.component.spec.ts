import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailOrderComponent } from './mail-order.component';

describe('MailOrderComponent', () => {
  let component: MailOrderComponent;
  let fixture: ComponentFixture<MailOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
