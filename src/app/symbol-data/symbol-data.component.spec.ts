import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolDataComponent } from './symbol-data.component';

describe('SymbolDataComponent', () => {
  let component: SymbolDataComponent;
  let fixture: ComponentFixture<SymbolDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
