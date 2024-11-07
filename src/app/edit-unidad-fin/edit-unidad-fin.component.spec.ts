import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnidadFinComponent } from './edit-unidad-fin.component';

describe('EditUnidadFinComponent', () => {
  let component: EditUnidadFinComponent;
  let fixture: ComponentFixture<EditUnidadFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUnidadFinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnidadFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
