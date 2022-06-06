import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChairComponent } from './select-chair.component';

describe('SelectChairComponent', () => {
  let component: SelectChairComponent;
  let fixture: ComponentFixture<SelectChairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectChairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
