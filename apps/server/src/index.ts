import "dotenv/config";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";


import { RPCHandler } from "@orpc/server/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { appRouter } from "./routers/index";
import { createServer } from "node:http";
import { createContext } from "./lib/context";

import type { FastifyRequest, FastifyReply } from "fastify";
import { streamText, type Message } from "ai";
import { google } from "@ai-sdk/google";

import { auth } from "./lib/auth";

const baseCorsConfig = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3001/",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With"
  ],
  credentials: true,
  maxAge: 86400,
};

const handler = new RPCHandler(appRouter, {
  plugins: [
    new CORSPlugin({
      origin: process.env.CORS_ORIGIN || "http://localhost:3001/",
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  ],
});

const fastify = Fastify({
  logger: true,
  serverFactory: (fastifyHandler) => {
    const server = createServer(async (req, res) => {
      const { matched } = await handler.handle(req, res, {
        context: await createContext(req),
        prefix: "/rpc",
      });

      if (matched) {
        return;
      }

      fastifyHandler(req, res);
    });

    return server;
  },
});

fastify.register(fastifyCors, baseCorsConfig);

fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      const response = await auth.handler(req);
      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    } catch (error) {
      fastify.log.error("Authentication Error:", error);
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE"
      });
    }
  }
});


interface AiRequestBody {
  id?: string;
  messages: Message[];
}

fastify.post('/ai', async function (request, reply) {
  const { messages } = request.body as AiRequestBody;
  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages,
  });

  reply.header('X-Vercel-AI-Data-Stream', 'v1');
  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(result.toDataStream());
});

fastify.get('/', async () => {
  return 'OK'
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server running on port 3000");
});
