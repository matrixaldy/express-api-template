import { Router } from 'express';
import * as users from '../controllers/user.controller';
import { createUserValidation, updateUserValidation } from '../validator/user.validator';
import { requestValidationHandler } from '../middleware/requestValidatorHandler';

const userRoute = Router();

userRoute.get('/', users.index);
userRoute.post('/', createUserValidation, requestValidationHandler, users.create);
userRoute.get('/:id', users.show);
userRoute.put('/:id', updateUserValidation, requestValidationHandler, users.update);
userRoute.delete('/:id', users.destroy);

export default userRoute;
