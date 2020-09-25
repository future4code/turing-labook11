import express from 'express'
import { friends } from '../endpoints/friends'
import { login } from '../endpoints/login'
import { notFriends } from '../endpoints/notFriend'
import { signUp } from '../endpoints/signUp'

export const userRouter = express.Router()

userRouter.put("/signup", signUp)
userRouter.post("/login", login)
userRouter.post("/friends", friends)
userRouter.post("/notfriends", notFriends)