import { POST_ROLES } from "../data/PostDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { PostDatabase } from '../data/PostDatabase'
import { UserDatabase } from "../data/UserDatabase";

export class PostBusiness{
    public async post(token: string, photo: string, description: string, createdAt: string, role: POST_ROLES): Promise<void>{

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getData(token)

        const postData = {
            photo,
            description,
            createdAt,
            role,
            userId: authenticationData.id
        }

        if(!postData.photo || !postData.description || !postData.role){
            throw new Error("Insira todas as informações necessárias para criar o post")
        }

        if(postData.role !== "NORMAL" && postData.role !== "EVENTO"){
            throw new Error("O role deve ser informado como NORMAL ou EVENTO")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generateId()

        const postDatabase = new PostDatabase()
        await postDatabase.createPost(
            id,
            postData.photo,
            postData.description,
            postData.createdAt,
            postData.role,
            postData.userId
        )

    }

    public async getFeed(token: string): Promise<any>{
        
        const authenticator = new Authenticator()
        const authenticationData = await authenticator.getData(token)

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserById(authenticationData.id)

        const postDatabase = new PostDatabase()
        const postFeed = await postDatabase.getFeed(user.getId())

        return postFeed
    }

    public async searchPosts(role: string): Promise<any> {

        if(!role){
            throw new Error("Informe um valor para \"role\"")
        }

        if(role !== "normal" && role !== "evento"){
            throw new Error("Deve ser informado para o role o valor de \"normal\" ou \"evento\"")
        }

        const result = await new PostDatabase().searchPosts(role)

        if(!result){
            throw new Error("Nenhum post encontrado")
        }

        return result


    }
}