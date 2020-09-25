import {Request, Response} from 'express'
import dayjs from "dayjs"
import { BaseDatabase } from '../data/BaseDatabase'
import { PostBusiness } from '../business/PostBusiness'

export const post = async(req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string

        const photo = req.body.photo
        const description = req.body.description
        const role = req.body.role
        const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss")

        const postBusiness = new PostBusiness()
        await postBusiness.post(token, photo, description, createdAt, role)

        res.status(200).send({message: "Post criado com sucesso!"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }finally{
        await BaseDatabase.destroyConnection()
    }
} 