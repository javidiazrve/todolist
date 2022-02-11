export interface Proyecto {
    titulo: string,
    tareas: Tarea[]
}

export interface Tarea{
    titulo: string,
    status: boolean
}