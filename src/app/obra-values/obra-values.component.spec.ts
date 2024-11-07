import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraValuesComponent } from './obra-values.component';

describe('ObraValuesComponent', () => {
  let component: ObraValuesComponent;
  let fixture: ComponentFixture<ObraValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
