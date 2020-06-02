import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPromoPage } from './add-promo.page';

describe('AddProductPage', () => {
  let component: AddPromoPage;
  let fixture: ComponentFixture<AddPromoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPromoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
