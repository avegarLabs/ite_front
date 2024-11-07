import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadFinComponent } from './unidad-fin.component';

describe('UnidadFinComponent', () => {
  let component: UnidadFinComponent;
  let fixture: ComponentFixture<UnidadFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadFinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
