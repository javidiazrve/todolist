import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ProyectosService } from './Services/proyectos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private proyectosService: ProyectosService,
    private platform: Platform
    ) {}

  ngOnInit(){
    
  }
}
