import { Post } from "./post";
import { User } from "./user";

export class Comment {
  id: number = 0;
  content!: string;
  commentDate!: Date;
  userComment!: User;
  post!: Post;
  readMore: boolean = false;
}