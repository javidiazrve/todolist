import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/interfaces';

@Component({
  selector: 'card-proyecto',
  templateUrl: './card-proyecto.component.html',
  styleUrls: ['./card-proyecto.component.scss'],
})
export class CardProyectoComponent implements OnInit {

  @Input('proyecto') proyecto: Proyecto;

  constructor() { }

  ngOnInit() {}

  // SETTINGS

  // GETTERS AND SETTERS

  getTareaPendiente(){
    if(this.tareasVacias()) return false;

    const tareaPendiente = this.proyecto.tareas.find(res => res.status === false);
  
    return tareaPendiente;
  }

  getPorcentajeCompleto(fuente: number){

    // fuente representa que componente esta llamando la funcion
    // 0 para el progress-bar y 1 para el label

    const total = this.proyecto.tareas.length;

    if(total === 0) return 0;

    const completas = this.proyecto.tareas.filter(res => res.status === true).length

    const porcentaje = 100 / (total/completas);

    if(fuente === 0) return porcentaje / 100;
    else return porcentaje.toFixed(2)

  }

  // FUNCIONES

  // VALIDACIONES

  tareasVacias(){
    return this.proyecto.tareas.length === 0? true : false;
  }


}
