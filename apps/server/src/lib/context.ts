import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";
import type { FastifyRequest } from "fastify";

export async function createContext(req: FastifyRequest) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return {
    session,
  };
}


export type Context = Awaited<ReturnType<typeof createContext>>;
