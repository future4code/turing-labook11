import {Request, Response} from 'express'
import { PostBusiness } from '../business/PostBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export const searchPosts = async(req: Request, res: Response) => {
    try {
        const role = req.query.role as string

        const result = await new PostBusiness().searchPosts(role)

        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({message: error.message})
    }finally{
        await BaseDatabase.destroyConnection()
    }
}