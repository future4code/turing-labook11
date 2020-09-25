import { POST_ROLES } from "../data/PostDatabase";

export class Post{
    constructor(
        private id: string, 
        private photo: string, 
        private description: string, 
        private createdAt: string, 
        private role: POST_ROLES, 
        private userId: string
    ){}

    getId() {return this.id}
    getPhoto() {return this.photo}
    getDescription() {return this.description}
    getCreatedAt() {return this.createdAt}
    getRole() {return this.role}
    getUserId() {return this.userId}

    setId(id: string) {this.id = id}
    setPhoto(photo: string) {this.photo = photo}
    setDescription(description: string) {this.description = description}
    setCreatedAt(createdAt: string) {this.createdAt = createdAt}
    setRole(role: POST_ROLES) {this.role = role}
    setUserId(userId: string) {this.userId = userId}

}
