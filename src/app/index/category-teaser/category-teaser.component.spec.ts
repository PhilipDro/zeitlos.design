import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTeaserComponent } from './category-teaser.component';

describe('CategoryTeaserComponent', () => {
  let component: CategoryTeaserComponent;
  let fixture: ComponentFixture<CategoryTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
