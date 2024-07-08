// task.model.ts

export interface TaskModel {
    idTask: number;
    title: string;
    descriptionTask: string;
    dateCreation: Date;
    dateFinish: Date | null;
}
