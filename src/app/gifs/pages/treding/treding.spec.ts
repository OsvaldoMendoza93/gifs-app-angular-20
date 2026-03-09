import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Treding } from './treding';

describe('Treding', () => {
  let component: Treding;
  let fixture: ComponentFixture<Treding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Treding],
    }).compileComponents();

    fixture = TestBed.createComponent(Treding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
