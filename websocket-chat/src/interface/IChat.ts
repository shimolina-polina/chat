import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChat {
    type: string,
    title: string,
    chatId: string,
    messages: IMessage[]
}

export interface ICreateChat {
    sender: IUser,
    type: string,
    title: string,
    userIds: string[]
}