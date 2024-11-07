import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipologyComponent } from './tipology.component';

describe('TipologyComponent', () => {
  let component: TipologyComponent;
  let fixture: ComponentFixture<TipologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
