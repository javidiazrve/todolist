import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Proyecto, Tarea } from '../interfaces';
import { ProyectosService } from '../Services/proyectos.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.page.html',
  styleUrls: ['./proyecto.page.scss'],
})
export class ProyectoPage implements OnInit {

  proyecto: Proyecto;
  tareaActual: Tarea;
  tareasPendientes: Tarea[];
  tareasCompletas: Tarea[];

  btnsDisabled: boolean = false;

  constructor(
    private proyectoService: ProyectosService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.proyecto = this.proyectoService.getProyectoActual();
    this.setVariables();
  }

  // SETTINGS

  setVariables() {
    this.tareasPendientes = this.getPendientes();
    this.tareasCompletas = this.getCompletas()
    this.setTareaActual();
  }

  bloquearBtns(e){

    if(e === false) this.btnsDisabled = true;
    else this.btnsDisabled = false;
  
  }

  // GETTERS AND SETTERS

  getPendientes() {
    return this.proyecto.tareas.filter(res => res.status === false);
  }

  getCompletas() {
    return this.proyecto.tareas.filter(res => res.status === true);
  }

  setTareaActual() {
    this.tareaActual = this.tareasPendientes.shift();
  }

  // FUNCIONES

  borrarProyecto(){
    this.proyectoService.borrarProyecto(this.proyecto).then((res)=> {
      if(res){
        this.irAtras();
      }
    })
  }

  editarTituloProyecto() {
    this.proyectoService.editarTituloProyecto().then(() => {
      this.setVariables()
    })
  }

  nuevaTarea() {
    this.proyectoService.nuevaTarea().then(res => {
      this.setVariables();
    })
  }

  setRecordatorio() {

  }

  irAtras() {
    this.navCtrl.back();
    this.proyectoService.setNullProyectoActual();
  }

  actualizar() {
    this.setVariables()
  }

  // VALIDACIONES

  proyectoTerminado() {
    if (this.proyecto.tareas.length === 0) {
      return false;
    }

    if (!this.tareaActual && this.tareasPendientesVacio() && !this.tareasCompletasVacio()) {
      return true
    } else {
      return false;
    }
  }

  tareasCompletasVacio() {
    return this.tareasCompletas.length === 0 ? true : false;
  }

  tareasPendientesVacio() {
    return this.tareasPendientes.length === 0 ? true : false;
  }

}
