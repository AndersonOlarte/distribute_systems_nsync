import { Request, Response } from "express";


export const uploadDocument = async (req: Request, res: Response) => {
try {
    res.status(200).send({message: 'Hello from upload documents'});
} catch (error) {
    if (error instanceof Error) {
        res.status(500).send({message: error.message});
    }
}
}