import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BannerOfertasPage } from './banner-ofertas.page';

describe('BannerOfertasPage', () => {
  let component: BannerOfertasPage;
  let fixture: ComponentFixture<BannerOfertasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerOfertasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BannerOfertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
