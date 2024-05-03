import { CommentDetails } from "./comment-details";

export class TweetDetails {

    private static id_seq = 0;

    public id: number;
    public authorId: number;
    public text: string;
    public likes: number;
    public retweets: number;
    public comments: CommentDetails[];


    constructor(
        public tauthorId: number,
        public ttext: string
    ) {
      this.id = TweetDetails.id_seq;
      TweetDetails.id_seq ++;

      this.authorId = tauthorId;
      this.text = ttext;
      this.likes = 0;
      this.retweets = 0;
      this.comments = [];
    }

    addComment(newComment: CommentDetails) {
      this.comments.push(newComment);
    }
  
  }