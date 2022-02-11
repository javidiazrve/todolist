import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tarea } from '../../interfaces';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'card-tarea-actual',
  templateUrl: './card-tarea-actual.component.html',
  styleUrls: ['./card-tarea-actual.component.scss'],
})
export class CardTareaActualComponent implements OnInit {

  @Input('tareaActual') tareaActual: Tarea;
  @Input('btnsDisabled') btnsDisabled: boolean;
  
  @Output() actualizar = new EventEmitter<number>();

  constructor(
    private proyectoService: ProyectosService
  ) { }

  ngOnInit() {}

  // SETTINGS

  // FUNCIONES
  
  editarTareaActual() {
    this.proyectoService.editarTarea(this.tareaActual).then(() => {
      this.actualizar.emit();
    })
  }

  borrarTareaActual() {
    this.proyectoService.borrarTarea(this.tareaActual).then(()=> {
      this.actualizar.emit()
    })
  }

  terminarTarea(){
    this.proyectoService.terminarTarea(this.tareaActual).then(() => {
      this.actualizar.emit();
    })
  }
  
  // VALIDACIONES


}
