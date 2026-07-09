import { QUERY_KEYS } from "@/utils/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getChatHistory, sendChatMessage } from "../services/chat";
import type { SendChatMessagePayload } from "../types";

export function useChatHistory() {
  return useQuery({
    queryKey: QUERY_KEYS.messages.chatHistory,
    queryFn: getChatHistory,
  });
}

export function useSendChatMessage() {
  return useMutation({
    mutationFn: (payload: SendChatMessagePayload) => sendChatMessage(payload),
  });
}
