"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnexion_1 = __importDefault(require("../dbConnexion"));
//Get all Tasks
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnexion = yield dbConnexion_1.default.connect();
        //make the request
        const result = yield dbConnexion.query('SELECT * FROM v_taskDone_or_not');
        dbConnexion.release();
        // Renvoyer les données sous forme de tableau de tâches (Task[])
        res.status(201);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Erreur :', error);
        res.status(500).json({ error: "Quelque chose s'est mal passé" });
    }
});
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract task data from the request (e.g., req.body)
        const { title, descriptionTask, dateCreation } = req.body;
        // Check if attributes are not empty
        if (!title || !descriptionTask || !dateCreation) {
            return res.status(400).json({ error: 'Missing required attributes' });
        }
        // Insert the new task into the database
        const client = yield dbConnexion_1.default.connect();
        const query = `
            INSERT INTO Task (title, descriptionTask, dateCreation)
            VALUES ($1, $2, $3)
            RETURNING idTask`;
        const values = [title, descriptionTask, dateCreation];
        const result = yield client.query(query, values);
        client.release();
        const newTaskId = result.rows[0].idTask;
        res.status(201).json({ message: 'Task created successfully', taskId: newTaskId });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
//Finish or unfinish Task
const changeTaskStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id; // get idtask from params
        const existingTask = yield getTaskById(taskId);
        //check if idTask is valid as Number
        const parsedTaskId = parseInt(taskId, 10);
        if (isNaN(parsedTaskId) || parsedTaskId <= 0) {
            throw new Error('Invalid taskId');
        }
        //check if idTack is valid in the table Task
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        var now = req.body.dateFinish || new Date();
        if (existingTask.datefinish) {
            now = null;
        }
        // Update the task's dateFinish
        const client = yield dbConnexion_1.default.connect();
        const query = `
            UPDATE Task
            SET dateFinish = $1
            WHERE idTask = $2`;
        const values = [now, taskId];
        //console.log query final with all the values
        yield client.query(query, values);
        console.log(query);
        client.release();
        res.status(200).json({ message: 'Task updated successfully' });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
// ABOUT UPDATE TASK AND CHECK IF idTask VALID
const getTaskById = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnexion = yield dbConnexion_1.default.connect();
        const result = yield dbConnexion.query('SELECT * FROM v_taskDone_or_not WHERE idTask = $1', [taskId]);
        dbConnexion.release();
        return result.rows[0] || null;
    }
    catch (error) {
        console.error('Error fetching task:', error);
        return null;
    }
});
const updateTaskInDatabase = (taskId, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnexion = yield dbConnexion_1.default.connect();
        const existingTask = yield getTaskById(taskId); // Implement your getTaskById function
        if (!existingTask) {
            throw new Error('Task not found');
        }
        // Save the updated task
        yield dbConnexion.query('UPDATE task SET title = $1, descriptionTask = $2, dateCreation = $3, dateFinish = $4 WHERE idTask = $5', [
            updatedFields.title,
            updatedFields.descriptiontask,
            updatedFields.datecreation,
            updatedFields.datefinish,
            taskId
        ]);
        dbConnexion.release();
    }
    catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Failed to update task');
    }
});
const updateTaskFieldsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id; // get idtask from params
        const existingTask = yield getTaskById(taskId);
        const parsedTaskId = parseInt(taskId, 10);
        if (isNaN(parsedTaskId) || parsedTaskId <= 0) {
            throw new Error('Invalid taskId');
        }
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        // Update only the provided fields
        const updatedFields = {
            title: req.body.title || existingTask.title,
            descriptiontask: req.body.descriptionTask || existingTask.descriptiontask,
            datecreation: req.body.dateCreation || existingTask.datecreation,
            datefinish: req.body.dateFinish || existingTask.datefinish
        };
        // Save the updated task
        yield updateTaskInDatabase(taskId, updatedFields);
        res.status(200).json({ message: 'Task updated successfully' });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
// END HERE THE UPDATE TASK
const DeleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id; // get idtask from params
        const existingTask = yield getTaskById(taskId);
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
        const client = yield dbConnexion_1.default.connect();
        const query = `
            INSERT INTO TaskDeleted (idTask, dateDelete)
            VALUES ($1, $2)
            RETURNING idTask`;
        const values = [taskId, now];
        const result = yield client.query(query, values);
        client.release();
        const newTaskId = result.rows[0].idTask;
        res.status(201).json({ message: 'Task deleted successfully', taskId: newTaskId });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.default = { getTasks, createTask, changeTaskStatus, updateTaskFieldsById, DeleteTask };
