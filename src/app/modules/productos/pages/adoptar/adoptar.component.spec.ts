import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptarComponent } from './adoptar.component';

describe('AdoptarComponent', () => {
  let component: AdoptarComponent;
  let fixture: ComponentFixture<AdoptarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptarComponent]
    });
    fixture = TestBed.createComponent(AdoptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
