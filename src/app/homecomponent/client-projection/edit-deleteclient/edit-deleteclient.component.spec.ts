import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteclientComponent } from './edit-deleteclient.component';

describe('EditDeleteclientComponent', () => {
  let component: EditDeleteclientComponent;
  let fixture: ComponentFixture<EditDeleteclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeleteclientComponent]
    });
    fixture = TestBed.createComponent(EditDeleteclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
