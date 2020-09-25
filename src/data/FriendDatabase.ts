import { BaseDatabase } from "./BaseDatabase";

export class FriendDatabase extends BaseDatabase{
    private static TABLE_NAME: string = 'friends'

    public async createFriendship(id_user: string, id_friend: string): Promise<void> {
        await this.getConnection()
        .whereNot ({id_user, id_friend})
        .insert({
            id_user,
            id_friend
        })
        .into(FriendDatabase.TABLE_NAME)
    }

    public async deleteFriendship(id_user: string, id_friend: string): Promise<void> {
        await this.getConnection()
        .where({
            id_user,
            id_friend
          })
          .orWhere({
            id_user: id_friend,
            id_friend: id_user
          })
        .delete()
        .table(FriendDatabase.TABLE_NAME)
    }

    public async checkFriendship(id_user: string, id_friend: string): Promise<any> {
        const result = await this.getConnection()
          .select('*')
          .from(FriendDatabase.TABLE_NAME)
          .where({
            id_user,
            id_friend
          })
          .orWhere({
            id_user: id_friend,
            id_friend: id_user
          })
        return result[0];
      }

}