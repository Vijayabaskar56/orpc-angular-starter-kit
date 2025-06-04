import type { IncomingHttpHeaders } from "node:http";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";

export async function createContext(req: IncomingHttpHeaders) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req),
  });
  return {
    session,
  };
}


export type Context = Awaited<ReturnType<typeof createContext>>;
