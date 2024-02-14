    declare module 'next-auth' {
      interface Session {
        user: {
          email: string;
          name: string;
          image: string;

          userId: string;
          username: string;
          rank: string
        };
      }
    }


export interface MinUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;

    username: string | null;
    rank: Rank
}

export type Rank = "admin" | "observer" | "member" | "person"

export interface User extends MinUser {
    phoneNumber: string | null;
}
  
export interface Fetch {
  type: FetchType;
}

export type FetchType =
true |
"session" |
"authority" |
"params" |
"undefined"

export interface FetchError extends Fetch {
  error: string; 
}

export interface FetchUser extends User, Fetch {

}

export interface FetchMinUser extends MinUser, Fetch {

}



export interface File extends Fetch {
  fileId: string;
  userId: string;
  publicAuthority: string;
}

export interface FetchFile extends Fetch {
  md: string;
}

export interface DBPost {
  id: string;
  title: string;
  date: string;
  fileId: string;
  userId: string;
}

export interface FetchDBPost extends DBPost, Fetch {

}

export interface Post {
  id?: string
  title: string;
  date?: string;
  userId?: string;
  html: string
}


export interface FetchPost extends Post, Fetch {
}

export interface PostItem {
  id: string;
  title: string;
  date: string;
}

export interface FetchPostItem extends Fetch {
  posts: PostItem[];
}

export interface ApplicationItem {
  id?: string;
  title: string;
  email: string;
  date?: Date;
}

export interface Application extends ApplicationItem {
  name: string;
  phoneNumber: string;
  userId?: string;
  html: string;
}

export interface FetchApplication extends ApplicationItem, Fetch {
  name: string;
  phoneNumber: string;
  userId: string;
  fileId: string;
}

export interface FetchApplicationItems extends Fetch {
  applications: ApplicationItems[];
}