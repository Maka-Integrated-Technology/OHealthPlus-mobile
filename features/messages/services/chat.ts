import { axiosPrivate } from "@/config/axios";
import { unwrapApiData } from "@/utils/apiResponse";
import type {
  ChatHistoryResponse,
  SendChatMessagePayload,
  SendChatMessageResponse,
} from "../types";

export async function getChatHistory(): Promise<ChatHistoryResponse> {
  const res = await axiosPrivate.get("/chat/history");
  const data = unwrapApiData<ChatHistoryResponse>(res.data);
  return data ?? { chats: [], messages: [] };
}

export async function sendChatMessage(
  payload: SendChatMessagePayload,
): Promise<SendChatMessageResponse> {
  const res = await axiosPrivate.post("/chat/send", payload);
  const data = unwrapApiData<SendChatMessageResponse>(res.data);
  if (!data) throw new Error("No chat data in response");
  return data;
}
