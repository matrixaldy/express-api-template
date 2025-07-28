import { Router } from "express";
import userRoute from "./user.route";

const apiV1 = Router();

apiV1.use('/users', userRoute);

export default apiV1;