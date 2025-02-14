export interface ApiChatQueryResponse {
  status: number;
  chat_response: string | ReadableStream;
  error: string;
}
