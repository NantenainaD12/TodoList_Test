import express from 'express';
import TaskController from '../controllers/TaskController';

const router = express.Router();

// EndPoints: GET localhost:1337/TaskManagement/getTasks
router.get('/getTasks', TaskController.getTasks);


// EndPoints: POST localhost:1337/TaskManagement/createTask => BODY REQUEST : 
// {
//     "title":"dfdfdf",
//     "descriptionTask":"dfdfdfd",
//     "dateCreation":"2024-07-08 10:00:00"
// }
router.post('/createTask', TaskController.createTask);

// EndPoints: POST localhost:1337/TaskManagement/changeTaskStatus/idTask
router.post('/changeTaskStatus/:id', TaskController.changeTaskStatus);

// EndPoints: POST localhost:1337/TaskManagement/updateTaskFieldsById/idTask
router.post('/updateTaskFieldsById/:id', TaskController.updateTaskFieldsById);

// EndPoints: POST localhost:1337/TaskManagement/DeleteTask/5
router.post('/DeleteTask/:id', TaskController.DeleteTask);

export = router;
