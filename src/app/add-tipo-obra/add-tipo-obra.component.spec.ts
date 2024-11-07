import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoObraComponent } from './add-tipo-obra.component';

describe('AddTipoObraComponent', () => {
  let component: AddTipoObraComponent;
  let fixture: ComponentFixture<AddTipoObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipoObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
