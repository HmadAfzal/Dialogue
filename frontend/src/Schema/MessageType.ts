

export interface MessageType {
    body: string,
    conversationId:string,
    createdAt:string,
    id:string,
    senderId:string,
    updatedAt:string,
    shouldShake?: boolean
}


export interface MessageBody {
    message:string
}