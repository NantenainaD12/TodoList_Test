// task.model.ts

export interface TaskModel {
    idTask: number;
    title: string;
    descriptiontask: string;
    datecreation: Date;
    datefinish: Date | null;
}
