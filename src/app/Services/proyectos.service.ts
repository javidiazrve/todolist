import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Proyecto, Tarea } from '../interfaces';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private proyectoActual: Proyecto;

  proyectos: Proyecto[] = [];

  constructor(
    private alertCtrl: AlertController
  ) { }

  // SETINGS

  async getProyectosStorage() {
    return new Promise<void>(async (resolve,rejected) => {
      const value = (await Storage.get({ key: "Proyectos" })).value
      if(value){
        this.proyectos = JSON.parse(value);
      }
      resolve();
    })
  }


  actualizarProyectos() {

    return Storage.set({ key: 'Proyectos', value: JSON.stringify(this.proyectos) })

  }

  // GETTERS AND SETTERS

  getProyectos() {
    return this.proyectos;
  }

  getProyectoActual() { return this.proyectoActual; }

  setProyectoActual(proyecto: Proyecto) { this.proyectoActual = proyecto; }

  setNullProyectoActual() { this.proyectoActual = null; }

  // FUNCIONES

  borrarProyecto(proyecto: Proyecto){
    return new Promise<boolean>(async (resolve, rejected) => {

      const alert = await this.alertCtrl.create({
        header: "Borrar Proyecto",
        message: "Si borra este proyecto no se podra recuperar.",
        mode: "ios",
        buttons: [
          {
            text: "Cancelar"
          },
          {
            text: "Borrar",
            handler: () => {
              const index = this.proyectos.findIndex(el => el === proyecto);
              this.proyectos.splice(index, 1);
              this.actualizarProyectos();
              resolve(true)
            }
          }
        ]
      })
      alert.present()
    })
  }

  async nuevoProyecto() {

    return new Promise<any>(async (resolve, rejected) => {
      const alert = await this.alertCtrl.create({
        header: "Nuevo Proyecto",
        mode: "ios",
        inputs: [
          {
            type: "text",
            placeholder: "Titulo..."
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            handler: ()=>{}
          },
          {
            text: "Aceptar",
            handler: (e)=>{
              
              let nuevoProyecto: Proyecto = {
                titulo: e[0],
                tareas: []
              }

              this.proyectos.push(nuevoProyecto);

              this.actualizarProyectos().then(() => {
                resolve(true);
              })
            }
          }
        ]
      })
  
      alert.present();
    })
      
      
    
  }

  nuevaTarea() {
    return new Promise<void>(async (resolve, rejected) => {

      const alert = await this.alertCtrl.create({
        header: "Nueva Tarea",
        mode: "ios",
        inputs: [
          {
            type: "text",
            placeholder: "Nombre de la tarea"
          }
        ],
        buttons: [
          {
            text: "Confirmar",
            handler: (e) => {
              this.proyectoActual.tareas.push({
                titulo: e[0],
                status: false
              })
              this.actualizarProyectos();
              resolve();
            }
          }
        ]
      })

      alert.present()

    })
  }

  async editarTarea(tarea: Tarea) {

    return new Promise<void>(async (resolve, rejected) => {

      const alert = await this.alertCtrl.create({
        header: "Editar Tarea",
        mode: "ios",
        inputs: [
          {
            type: "text",
            placeholder: "Nombre de la tarea",
            value: tarea.titulo
          }
        ],
        buttons: [
          {
            text: "Confirmar",
            handler: (e) => {
              tarea.titulo = e[0];
              this.actualizarProyectos();
              resolve();
            }
          }
        ]
      })

      alert.present();
    })
  }

  borrarTarea(tarea: Tarea) {

    return new Promise<void>(async (resolve, rejected) => {

      const alert = await this.alertCtrl.create({
        header: "Borrar tarea",
        message: "Esta seguro que quiere borrar esta tarea?",
        mode: "ios",
        buttons: [
          {
            text: "Borrar",
            handler: () => {
              const index = this.proyectoActual.tareas.findIndex(tar => tar === tarea);
              this.proyectoActual.tareas.splice(index, 1);
              this.actualizarProyectos();
              resolve()
            }
          },
          {
            text: "Cancelar",
            handler: () => { }
          }
        ]
      })

      alert.present();
    })
  }

  reordenarTareas(completas: Tarea[], pendientes: Tarea[]){

    return new Promise<void>((resolve,rejected) => {
      this.proyectoActual.tareas = completas.concat(pendientes);
      this.actualizarProyectos();
      resolve();
    })

  }

  editarTituloProyecto() {

    return new Promise<void>(async (resolve, rejected) => {

      const alert = await this.alertCtrl.create({
        header: "Editar Titulo",
        mode: "ios",
        inputs: [
          {
            type: "text",
            placeholder: "Titulo del proyecto",
            value: this.proyectoActual.titulo
          }
        ],
        buttons: [
          {
            text: "Confirmar",
            handler: (e) => {
              this.proyectoActual.titulo = e[0];
              this.actualizarProyectos();
              resolve()
            }
          }
        ]
      })

      alert.present();
    })
  }

  terminarTarea(tarea: Tarea) {
    return new Promise<void>((resolve, rejected) => {
      tarea.status = true;
      this.actualizarProyectos();
      resolve();
    })
  }

}
