import { Router } from "express";
import { confirmUserTransfer, createNewUser, deleteUserById, getUserById, tranferUserDocuments } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/v1/users',createNewUser );

userRouter.delete('/v1/users/:userid', deleteUserById);

userRouter.get('/v1/users/:userid', getUserById);

userRouter.post('/v1/users/:userid/transfer', tranferUserDocuments);

userRouter.get('/v1/users/:userid/transfer', confirmUserTransfer);



export default userRouter;