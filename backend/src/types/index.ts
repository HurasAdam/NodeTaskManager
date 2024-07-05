export interface IcustomError extends Error{
    kind?:string;
}

export interface IuserDocument extends IUser, Document{
    generateJWT():Promise<string>;
    comparePassword(password:string):Promise<boolean>;
}

export interface IUser{
    name: string;
    title: string;
    role: string;
    email: string;
    password: string;
    isAdmin: boolean;
    tasks: string[];
    isActive: boolean
}