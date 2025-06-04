import z from "zod/v4";
import { publicProcedure } from "../lib/orpc";
import { Todo } from "../db/models/todo.model";

export const todoRouter = {
    getAll: publicProcedure.handler(async () => {
        return await Todo.find().lean();
    }),

    create: publicProcedure
        .input(z.object({ text: z.string().min(1) }))
        .handler(async ({ input }) => {
            const newTodo = await Todo.create({ text: input.text });
            return newTodo.toObject();
    }),

    toggle: publicProcedure
        .input(z.object({ id: z.string(), completed: z.boolean() }))
        .handler(async ({ input }) => {
            await Todo.updateOne({ id: input.id }, { completed: input.completed });
            return { success: true };
    }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .handler(async ({ input }) => {
            await Todo.deleteOne({ id: input.id });
            return { success: true };
    }),
};


