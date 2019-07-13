import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineTesterComponent } from './engine-tester.component';

describe('EngineTesterComponent', () => {
  let component: EngineTesterComponent;
  let fixture: ComponentFixture<EngineTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
