import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromocionPage } from './promocion.page';

describe('PromocionPage', () => {
  let component: PromocionPage;
  let fixture: ComponentFixture<PromocionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
