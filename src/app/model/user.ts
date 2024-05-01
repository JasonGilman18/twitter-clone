export class User {

    constructor(
      public id: number,
      public fistName: string,
      public lastName: string,
      public email: string,
      public password: string,
      public bio: string,
      public followerCount: number,
      public followingCount: number
    ) {  }
  
  }