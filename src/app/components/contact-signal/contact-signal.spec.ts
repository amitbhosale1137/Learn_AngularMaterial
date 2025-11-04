import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSignal } from './contact-signal';

describe('ContactSignal', () => {
  let component: ContactSignal;
  let fixture: ComponentFixture<ContactSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSignal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
