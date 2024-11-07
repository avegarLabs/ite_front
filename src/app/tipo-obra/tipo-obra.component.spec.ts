import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoObraComponent } from './tipo-obra.component';

describe('TipoObraComponent', () => {
  let component: TipoObraComponent;
  let fixture: ComponentFixture<TipoObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
