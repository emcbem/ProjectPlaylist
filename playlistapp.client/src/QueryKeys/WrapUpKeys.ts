import { GetWrapUpRequest } from "@/@types/Requests/GetRequests/getWrapUpRequest";

export const WrapUpKeys = {
  GetWrapUp: (request: GetWrapUpRequest) => ["WrapUp", request.userId] as const,
};
