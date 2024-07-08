import { NextFunction, Request, Response } from 'express';
import pool from '../dbConnexion';
import { TaskModel } from '../model/TaskModel';

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dbConnexion = await pool.connect();
        //make the request
        const result = await dbConnexion.query<TaskModel>('SELECT * FROM v_taskDone_or_not');
        dbConnexion.release();

        // Renvoyer les données sous forme de tableau de tâches (Task[])
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur :', error);
        res.status(500).json({ error: "Quelque chose s'est mal passé" });
    }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract task data from the request (e.g., req.body)
        const { title, descriptionTask, dateCreation } = req.body;

        // Insert the new task into the database
        const client = await pool.connect();
        const query = `
            INSERT INTO Task (title, descriptionTask, dateCreation)
            VALUES ($1, $2, $3)
            RETURNING idTask`;
        const values = [title, descriptionTask, dateCreation];
        const result = await client.query<{ idTask: number }>(query, values);
        client.release();

        const newTaskId = result.rows[0].idTask;
        res.status(201).json({ message: 'Task created successfully', taskId: newTaskId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export default { getTasks, createTask };
