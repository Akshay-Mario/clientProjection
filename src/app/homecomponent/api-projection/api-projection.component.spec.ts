import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProjectionComponent } from './api-projection.component';

describe('ApiProjectionComponent', () => {
  let component: ApiProjectionComponent;
  let fixture: ComponentFixture<ApiProjectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiProjectionComponent]
    });
    fixture = TestBed.createComponent(ApiProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
