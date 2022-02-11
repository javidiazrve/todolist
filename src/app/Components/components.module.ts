import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CardProyectoComponent } from './card-proyecto/card-proyecto.component';
import { CardTareaActualComponent } from './card-tarea-actual/card-tarea-actual.component';
import { CardProyectoTerminadoComponent } from './card-proyecto-terminado/card-proyecto-terminado.component';
import { CardTareasVaciasComponent } from './card-tareas-vacias/card-tareas-vacias.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    CardProyectoComponent,
    CardTareaActualComponent,
    CardProyectoTerminadoComponent,
    CardTareasVaciasComponent,
    ListaTareasComponent
  ],
  exports: [
    CardProyectoComponent,
    CardTareaActualComponent,
    CardProyectoTerminadoComponent,
    CardTareasVaciasComponent,
    ListaTareasComponent
  ]
})
export class ComponentsModule {}