import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoObraModalComponent } from './edit-tipo-obra-modal.component';

describe('EditTipoObraModalComponent', () => {
  let component: EditTipoObraModalComponent;
  let fixture: ComponentFixture<EditTipoObraModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTipoObraModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoObraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
