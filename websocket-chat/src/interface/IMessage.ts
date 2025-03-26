import { IUser } from "./IUser";

export interface IMessage {
    id: string
    chatId: string,
    sender: IUser,
    text: string,
    timestamp: Date,
  }
