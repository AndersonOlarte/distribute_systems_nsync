import { Router } from "express";
import { createNewUser, deleteUserById, tranferUserDocuments } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/v1/users',createNewUser );

userRouter.delete('/v1/users/:userid', deleteUserById);

userRouter.post('/v1/users/:userid/transfer', tranferUserDocuments);

export default userRouter;