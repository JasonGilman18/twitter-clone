export class CommentDetails {

    private static id_seq = 0;

    public id: number;
    public authorId: number;
    public text: string;


    constructor(
        public tauthorId: number,
        public ttext: string
    ) {
      this.id = CommentDetails.id_seq;
      CommentDetails.id_seq ++;

      this.authorId = tauthorId;
      this.text = ttext;
    }
  
  }