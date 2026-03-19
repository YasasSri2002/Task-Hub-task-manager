import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTaskPage } from './detailed-task-page';

describe('DetailedTaskPage', () => {
  let component: DetailedTaskPage;
  let fixture: ComponentFixture<DetailedTaskPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedTaskPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedTaskPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
