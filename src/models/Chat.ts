import IMessage from "./Message";

export default interface IChat {
    user: string,
    chat: Array<IMessage>
}