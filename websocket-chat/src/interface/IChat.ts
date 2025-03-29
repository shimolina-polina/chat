import { IMessage } from "./IMessage";

export interface IChat {
    type: string,
    title: string,
    chatId: string,
    messages: IMessage[]
}