import express from 'express';
import TaskController from '../controllers/TaskController';

const router = express.Router();

router.get('/getTasks', TaskController.getTasks);

router.post('/createTask', TaskController.createTask);

export = router;
