export class User {

    private static id_seq = 0;

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public bio: string;
    public followerCount: number;
    public followingCount: number;
    public likedTweets: number[];
    public retweets: number[];

    constructor(
      public tfistName: string,
      public tlastName: string,
      public temail: string,
      public tpassword: string,
      public tbio: string
    ) {
      this.id = User.id_seq;
      User.id_seq ++;

      this.firstName = tfistName;
      this.lastName = tlastName;
      this.email = temail;
      this.password = tpassword;
      this.bio = tbio;
      this.followerCount = 0;
      this.followingCount = 0;
      this.likedTweets = [];
      this.retweets = [];
    }
  
  }