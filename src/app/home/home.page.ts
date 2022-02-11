import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProyectosService } from '../Services/proyectos.service';
import { Proyecto } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  proyectos: Proyecto[] = [];

  constructor(
    private proyectosService: ProyectosService,
    private navCtrl: NavController
  ) {}

  ngOnInit(){
  }
  
  ionViewWillEnter(){
    this.proyectosService.getProyectosStorage().then(()=>{
      this.getProyectos();
    });
  }

  // SETTINGS

  // GETTERS AND SETTERS

  getProyectos(){
    this.proyectos = this.proyectosService.getProyectos();    
  }

  // FUNCIONES

  nuevoProyecto(){

    this.proyectosService.nuevoProyecto().then(()=>{
      this.proyectos = this.proyectosService.getProyectos();
    })

  }

  verProyecto(proyecto){
    this.proyectosService.setProyectoActual(proyecto);
    this.navCtrl.navigateForward(['/proyecto']);
  }

  // VALIDACIONES

  proyectosVacios(){
    if(this.proyectos.length === 0) return true;
    else return false;
  }
}
