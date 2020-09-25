import {Request, Response} from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { BaseDatabase } from '../data/BaseDatabase'

export const getFeedPosts = async(req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string

        const postBusiness = new PostBusiness()
        const postFeed = await postBusiness.getFeed(token)

        res.status(200).send(postFeed)
    } catch (error) {
        res.status(400).send({message: error.message})
    }finally{
        await BaseDatabase.destroyConnection()
    }
}