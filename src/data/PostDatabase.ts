import { Post } from "../model/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    private static TABLE_NAME: string = "posts"

    public async createPost(id: string, photo: string, description: string, createdAt: string, role: POST_ROLES, userId: string): Promise<void>{
        await this.getConnection()
        .insert({
            id,
            photo,
            description,
            createdAt,
            role,
            userId
        })
        .into(PostDatabase.TABLE_NAME)
    }

    public async getFeed(id: string): Promise<Post>{
        const result = await this.getConnection().raw(
            `
            select posts.id, posts.photo, posts.description, posts.createdAt, posts.userId
            from posts
            join friends
            on friends.id_user = posts.userId or friends.id_friend = posts.userId
            join User_Lab
            on friends.id_friend = User_Lab.id or  friends.id_user = User_Lab.id
            where User_Lab.id = "${id}" and posts.userId <> "${id}"
            order by posts.createdAt desc;
            `
        )

        return result[0]
    }

    public async searchPosts(role: string): Promise<Post> {
        const result = await this.getConnection().raw(`
            select * from ${PostDatabase.TABLE_NAME}
            where role like "%${role.toLocaleLowerCase()}%"
            order by posts.createdAt desc;
        `)

        return result [0]

    }

}

export enum POST_ROLES{
    NORMAL = "NORMAL",
    EVENTO = "EVENTO"
}