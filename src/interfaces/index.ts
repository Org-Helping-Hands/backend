import { IncomingHttpHeaders } from "node:http";

export interface IBody {
  userId: string;
}

export interface IHeader extends IncomingHttpHeaders {
  token: string;
}
