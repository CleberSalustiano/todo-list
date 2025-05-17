import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import taskController from "../../../modules/task/infra/task.controller";

const routes = Router();

routes.use(taskController);

routes.use(errorHandler)

export default routes;