import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraUpdateComponent } from './obra-update.component';

describe('ObraUpdateComponent', () => {
  let component: ObraUpdateComponent;
  let fixture: ComponentFixture<ObraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
