export interface UserDataInterface {
  username: string;
  age: number | string;
  email: string;
  interests: string[];
  theme: string;
}

export interface ValidataionInterface {
    username?: string;
    age?: string;
    email?:string;
    interests?: string
}