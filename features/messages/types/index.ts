export type ChatSender = "user" | "ai";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ChatThread {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ChatHistoryResponse {
  chats: ChatThread[];
  messages: ChatMessage[];
}

export interface SendChatMessagePayload {
  chatId?: string;
  content: string;
}

export interface SendChatMessageResponse {
  chatId: string;
  ai: string;
}
