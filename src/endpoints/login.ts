import {Request, Response} from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { LoginInputDTo } from '../model/User'

export const login = async(req: Request, res: Response): Promise<void> => {
    try {
        const userData: LoginInputDTo = {
            email: req.body.email,
            password: req.body.password
        }

        const userBusiness = new UserBusiness()
        const token = await userBusiness.login(userData)

        res.status(200).send({"token": token})
    } catch (error) {
        res.status(400).send({message: error.message})
    }finally{
        await BaseDatabase.destroyConnection()
    }
    
}