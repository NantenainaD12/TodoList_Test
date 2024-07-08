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

const finishTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id; // Assuming you get the task ID from the request parameters
        const now = new Date();
        console.log(taskId);
        //const now = req.body.dateFinish;

        // Update the task's dateFinish
        const client = await pool.connect();
        const query = `
            UPDATE Task
            SET dateFinish = $1
            WHERE idTask = $2`;
        const values = [now, taskId];
        //console.log query final with all the values
        await client.query(query, values);
        console.log(query);
        client.release();

        res.status(200).json({ message: 'Task uccpdated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// ABOUT UPDATE TASK AND CHECK IF VALID

const getTaskById = async (taskId: string): Promise<TaskModel | null> => {
    try {
        const dbConnexion = await pool.connect();
        const result = await dbConnexion.query<TaskModel>('SELECT * FROM v_taskDone_or_not WHERE idTask = $1', [taskId]);
        dbConnexion.release();

        console.log('id= ' + taskId + ' query = ' + result.rows[0].descriptiontask);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching task:', error);
        return null;
    }
};

const updateTaskInDatabase = async (taskId: string, updatedFields: Partial<TaskModel>): Promise<void> => {
    try {
        const dbConnexion = await pool.connect();
        const existingTask = await getTaskById(taskId); // Implement your getTaskById function

        if (!existingTask) {
            throw new Error('Task not found');
        }

        // Save the updated task
        await dbConnexion.query('UPDATE task SET title = $1, descriptionTask = $2, dateCreation = $3, dateFinish = $4 WHERE idTask = $5', [
            updatedFields.title,
            updatedFields.descriptiontask,
            updatedFields.datecreation,
            updatedFields.datefinish,
            taskId
        ]);

        dbConnexion.release();
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Failed to update task');
    }
};

const updateTaskFieldsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id; // get idtask from params
        const existingTask = await getTaskById(taskId);

        const parsedTaskId = parseInt(taskId, 10);
        if (isNaN(parsedTaskId) || parsedTaskId <= 0) {
            throw new Error('Invalid taskId');
        }

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update only the provided fields
        const updatedFields: Partial<TaskModel> = {
            title: req.body.title || existingTask.title,
            descriptiontask: req.body.descriptionTask || existingTask.descriptiontask,
            datecreation: req.body.dateCreation || existingTask.datecreation,
            datefinish: req.body.dateFinish || existingTask.datefinish
        };

        // Save the updated task
        await updateTaskInDatabase(taskId, updatedFields);

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// END HERE THE UPDATE TASK

const DeleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id; // get idtask from params
        const existingTask = await getTaskById(taskId);

        //check if idTask is valid as Number
        const parsedTaskId = parseInt(taskId, 10);
        if (isNaN(parsedTaskId) || parsedTaskId <= 0) {
            throw new Error('Invalid taskId');
        }

        //check if idTack is valid in the table Task
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const now = req.body.dateFinish || new Date();

        // Insert the new task into the database
        const client = await pool.connect();
        const query = `
            INSERT INTO TaskDeleted (idTask, dateDelete)
            VALUES ($1, $2)
            RETURNING idTask`;
        const values = [taskId, now];
        const result = await client.query<{ idTask: number }>(query, values);
        client.release();

        const newTaskId = result.rows[0].idTask;
        res.status(201).json({ message: 'Task deleted successfully', taskId: newTaskId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export default { getTasks, createTask, finishTask, updateTaskFieldsById, DeleteTask };
