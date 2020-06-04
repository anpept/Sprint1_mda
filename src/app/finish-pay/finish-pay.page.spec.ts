import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinishPayPage } from './finish-pay.page';

describe('FinishPayPage', () => {
  let component: FinishPayPage;
  let fixture: ComponentFixture<FinishPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinishPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
