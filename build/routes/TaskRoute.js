"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const router = express_1.default.Router();
// EndPoints: GET localhost:1337/TaskManagement/getTasks
router.get('/getTasks', TaskController_1.default.getTasks);
// EndPoints: POST localhost:1337/TaskManagement/createTask => BODY REQUEST : 
// {
//     "title":"dfdfdf",
//     "descriptionTask":"dfdfdfd",
//     "dateCreation":"2024-07-08 10:00:00"
// }
router.post('/createTask', TaskController_1.default.createTask);
// EndPoints: POST localhost:1337/TaskManagement/changeTaskStatus/idTask
router.post('/changeTaskStatus/:id', TaskController_1.default.changeTaskStatus);
// EndPoints: POST localhost:1337/TaskManagement/updateTaskFieldsById/idTask
router.post('/updateTaskFieldsById/:id', TaskController_1.default.updateTaskFieldsById);
// EndPoints: POST localhost:1337/TaskManagement/DeleteTask/5
router.post('/DeleteTask/:id', TaskController_1.default.DeleteTask);
module.exports = router;
