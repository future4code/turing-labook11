import express from 'express'
import { getFeedPosts } from '../endpoints/getFeedPosts'
import { post } from '../endpoints/post'
import { searchPosts } from '../endpoints/searchPosts'

export const postRouter = express.Router()

postRouter.put("/", post)
postRouter.get("/feed", getFeedPosts)
postRouter.get("/search", searchPosts)