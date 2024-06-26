export class User {

    private static id_seq = 0;

    public id: number;
    public firstName: string;
    public lastName: string;
    public profileImg: any;
    public email: string;
    public password: string;
    public bio: string;
    public followers: number[];
    public following: number[];
    public tweets: number[];
    public likedTweets: number[];
    public retweets: number[];

    constructor(
      public tfistName: string,
      public tlastName: string,
      public tprofileImg: any,
      public temail: string,
      public tpassword: string,
      public tbio: string
    ) {
      this.id = User.id_seq;
      User.id_seq ++;

      this.firstName = tfistName;
      this.lastName = tlastName;
      this.profileImg = tprofileImg;
      this.email = temail;
      this.password = tpassword;
      this.bio = tbio;
      this.followers = [];
      this.following = [];
      this.likedTweets = [];
      this.retweets = [];
    }
  
  }