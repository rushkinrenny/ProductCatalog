import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceabilityComponent } from './add-serviceability.component';

describe('AddServiceabilityComponent', () => {
  let component: AddServiceabilityComponent;
  let fixture: ComponentFixture<AddServiceabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
