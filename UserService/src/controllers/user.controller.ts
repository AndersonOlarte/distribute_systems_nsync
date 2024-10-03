import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserInput } from "../entities/User.entity";

const userService = new UserService();


export const createNewUser = async (req: Request, res: Response) => {
    try {
        const newUserInput: UserInput = {
            name: req.body.name,
            email: req.body.email,
            age: parseInt(req.body.age),
            identification: req.body.identification,
            govCarpetaId: req.body.govCarpertaId
        }
        const newUser = await userService.createNewUser(newUserInput);
        if (newUser) return res.status(201).send({
            message: 'new user created succesfully',
            newUser        
        })
    } catch (error) {
        console.error('there was an error creating new user', error);
        return res.status(500).send({
            message: 'error creating new user'
        });
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userid: number = parseInt(req.params.userid);
        const wasDeleteUserSuccess = await userService.deleteUserById(userid);
        if (wasDeleteUserSuccess) {
            return res.status(200).send({
                message: `User with ID: ${userid} was deleted successfully`
            });
        }
        return res.status(400).send({
            message: `it was not possible to delete user with ID ${userid}`
        });
    } catch (error) {
        console.error('there was an error trying to delete user', error);
        return res.status(500).send({
            message: 'there was not possible delete a user'
        })
    }
}

export const tranferUserDocuments = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userid);
        const transferURL = req.body.url;
        if (userId) {
            const userDocs = await userService.tranferUserDocuments(userId, transferURL);
            if (userDocs) {
                return res.status(200).send({
                    messsage: 'request sent succesfully'
                })
            }

        }
    } catch (error) {
        console.error('there was an error trying to trasnferUserDocs', error);
        return res.status(500).send({
            message: 'error trying to transfer documents'
        })
    }
}

export const getRootFolderContent = async (req: Request, res: Response) => {

}