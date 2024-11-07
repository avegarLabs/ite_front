import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnidadFinComponent } from './add-unidad-fin.component';

describe('AddUnidadFinComponent', () => {
  let component: AddUnidadFinComponent;
  let fixture: ComponentFixture<AddUnidadFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnidadFinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnidadFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
