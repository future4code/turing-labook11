import {Request, Response} from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseDatabase } from '../data/BaseDatabase'

export const friends = async(req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string

        const id_friend = req.body.id_friend

        const userBusiness = new UserBusiness()
        await userBusiness.createFriendship(token, id_friend)
        
        res.status(200).send({message: "Agora vocês são amigos!"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }finally{
        await BaseDatabase.destroyConnection()
    }
    
}