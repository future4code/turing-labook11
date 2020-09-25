import { FriendDatabase } from "../data/FriendDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { LoginInputDTo, SignupInputDTO } from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness{
    public async signUp(userData: SignupInputDTO): Promise<string>{

        if(!userData.name || !userData.email || !userData.password){
            throw new Error("Insira todas as informações necessárias para o cadastro")
        }

        if(userData.email.indexOf("@") === -1){
            throw new Error("E-mail inválido!")
        }

        if(userData.password.length < 6){
            throw new Error("Senha deve conter 6 caracteres ou mais")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generateId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(userData.password)

        const userDatabase = new UserDatabase()
        await userDatabase.createUser(
            id,
            userData.name,
            userData.email,
            hashPassword
        )

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({id})

        return token
        
    }

    public async login(userData: LoginInputDTo): Promise<string> {

        if(!userData.email || !userData.password){
            throw new Error("Insira todas as informações necessárias para o login")
        }

        if(userData.email.indexOf("@") === -1){
            throw new Error("E-mail inválido!")
        }

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserByEmail(userData.email)

        const hashManager = new HashManager()
        const compareResult = await hashManager.compare(userData.password, user.getPassword())

        if(!compareResult){
            throw new Error("Usuário ou senha inválida!")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({id: user.getId()})

        return token

    }

    public async createFriendship(token: string, id_friend: string): Promise<void>{
        const authenticator = new Authenticator()
        const authenticationData = authenticator.getData(token)

        const friend = {
            id_user: authenticationData.id,
            id_friend
        }

        if(!friend.id_friend){
            throw new Error("Insira todas as informações necessárias")
        }

        const checkFriendship = await new FriendDatabase().checkFriendship(
            friend.id_user,
            friend.id_friend
        );

        if (checkFriendship) {
            throw new Error('Você já são amigos');
        }

        const friendDatabase = new FriendDatabase()
        await friendDatabase.createFriendship(
            friend.id_user,
            friend.id_friend
        )
    }

    public async deleteFriendship(token: string, id_friend: string): Promise<void>{
        const authenticator = new Authenticator()
        const authenticationData = authenticator.getData(token)

        const friend = {
            id_user: authenticationData.id,
            id_friend
        }

        if(!id_friend){
            throw new Error("Insira todas as informações necessárias")
        }

        const checkFriendship = await new FriendDatabase().checkFriendship(
            friend.id_user,
            friend.id_friend
        )

        if(!checkFriendship){
            throw new Error("Você não é amigo dessa pessoa")
        }

        const friendDatabase = new FriendDatabase()
        await friendDatabase.deleteFriendship(
            friend.id_user,
            friend.id_friend
        )
    }
}