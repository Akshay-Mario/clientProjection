import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeletebuttonComponent } from './edit-deletebutton.component';

describe('EditDeletebuttonComponent', () => {
  let component: EditDeletebuttonComponent;
  let fixture: ComponentFixture<EditDeletebuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeletebuttonComponent]
    });
    fixture = TestBed.createComponent(EditDeletebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
