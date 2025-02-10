import { Router } from 'express';
import { UserController } from '../controller/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/users/potential', authMiddleware, userController.getMostPotentialUsers);
userRouter.put('/users/:userId', authMiddleware, userController.updateUserData);

export default userRouter;