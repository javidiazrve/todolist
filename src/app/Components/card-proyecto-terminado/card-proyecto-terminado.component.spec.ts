import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardProyectoTerminadoComponent } from './card-proyecto-terminado.component';

describe('CardProyectoTerminadoComponent', () => {
  let component: CardProyectoTerminadoComponent;
  let fixture: ComponentFixture<CardProyectoTerminadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProyectoTerminadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardProyectoTerminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
