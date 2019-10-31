import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVideoViewComponent } from './dialog-video-view.component';

describe('DialogVideoViewComponent', () => {
  let component: DialogVideoViewComponent;
  let fixture: ComponentFixture<DialogVideoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVideoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVideoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
