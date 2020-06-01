import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersPagePage } from './orders-page.page';

describe('OrdersPagePage', () => {
  let component: OrdersPagePage;
  let fixture: ComponentFixture<OrdersPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
