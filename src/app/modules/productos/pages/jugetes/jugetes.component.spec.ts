import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugetesComponent } from './jugetes.component';

describe('JugetesComponent', () => {
  let component: JugetesComponent;
  let fixture: ComponentFixture<JugetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JugetesComponent]
    });
    fixture = TestBed.createComponent(JugetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
