import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Tarea } from 'src/app/interfaces';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.scss'],
})
export class ListaTareasComponent implements OnInit {

  reordenar: boolean = true;

  @Input('completas') tareasCompletas: Tarea[];
  @Input('pendientes') tareasPendientes: Tarea[];
  @Input('tareaActual') tareaActual: Tarea;

  @Output() actualizar = new EventEmitter<any>();
  @Output() bloquearBtns = new EventEmitter<any>();

  @ViewChild('ItemSliding') itemSliding: IonItemSliding;

  constructor(
    private proyectoService: ProyectosService
  ) { }

  ngOnInit() {}

  // SETTINGS
  
  async reordarPendientes(){
    this.reordenar = !this.reordenar;

    this.bloquearBtns.emit(this.reordenar);

    if(this.reordenar === true){
      await this.proyectoService.reordenarTareas(this.tareasCompletas, this.tareasPendientes);
      this.actualizar.emit();
      return true;
    }else{
      if(this.tareaActual) this.tareasPendientes.unshift(this.tareaActual);
    }

    this.itemSliding.closeOpened();
  }

  doReorder(e){
    e.detail.complete(this.tareasPendientes);
  }

  // FUNCIONES

  nuevaTarea(){
    this.proyectoService.nuevaTarea().then(()=> {
      this.actualizar.emit();
    })
  }

  editarTarea(tarea: Tarea) {
    this.itemSliding.closeOpened();

    this.proyectoService.editarTarea(tarea).then(() => {
      this.actualizar.emit();
    })
  }

  borrarTarea(tarea: Tarea) {
    if(this.itemSliding){
      this.itemSliding.closeOpened();
    }

    this.proyectoService.borrarTarea(tarea).then(() => {
      this.actualizar.emit();
    })
  }

  // VALIDACIONES

  tareasCompletasVacio() {
    return this.tareasCompletas.length === 0 ? true : false;
  }

  tareasPendientesVacio() {
    return this.tareasPendientes.length === 0 ? true : false;
  }
}
