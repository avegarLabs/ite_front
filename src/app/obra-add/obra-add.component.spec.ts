import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraAddComponent } from './obra-add.component';

describe('ObraAddComponent', () => {
  let component: ObraAddComponent;
  let fixture: ComponentFixture<ObraAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
