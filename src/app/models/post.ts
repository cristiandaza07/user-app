import { User } from "./user";

export class Post{

    id: number = 0;
    title!: string;
    content!: string;
    postDate!: Date;
    user!: User;
    readMore: boolean = false;
}