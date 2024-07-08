import express from 'express';
import TaskController from '../controllers/TaskController';

const router = express.Router();

router.get('/getTasks', TaskController.getTasks);

router.post('/createTask', TaskController.createTask);
router.post('/finishTask/:id', TaskController.finishTask);
router.post('/updateTaskFieldsById/:id', TaskController.updateTaskFieldsById);
router.post('/DeleteTask/:id', TaskController.DeleteTask);

export = router;
