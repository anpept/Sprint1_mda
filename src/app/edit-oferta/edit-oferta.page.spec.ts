import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOfertaPage } from './edit-oferta.page';

describe('EditOfertaPage', () => {
  let component: EditOfertaPage;
  let fixture: ComponentFixture<EditOfertaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOfertaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOfertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
