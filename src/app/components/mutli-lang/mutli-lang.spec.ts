import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutliLang } from './mutli-lang';

describe('MutliLang', () => {
  let component: MutliLang;
  let fixture: ComponentFixture<MutliLang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutliLang]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutliLang);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
