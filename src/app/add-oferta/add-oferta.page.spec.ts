import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOfertaPage } from './add-oferta.page';

describe('AddOfertaPage', () => {
  let component: AddOfertaPage;
  let fixture: ComponentFixture<AddOfertaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfertaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOfertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
