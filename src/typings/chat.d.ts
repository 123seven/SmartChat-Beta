declare namespace Chat {
  interface Chat {
    dateTime: string
    text: string
    inversion?: boolean
    error?: boolean
    loading?: boolean
    conversationOptions?: ConversationRequest | null
    requestOptions: { prompt: string; options?: ConversationRequest | null }
  }

  interface History {
    title: string
    isEdit: boolean
    uuid: string
  }

  interface ChatState {
    active: string | null
    history: History[]
    chat: { uuid: string; data: Chat[] }[]
  }

  interface ConversationRequest {
    cid?: string | null
    usingContext?: boolean
  }

}
