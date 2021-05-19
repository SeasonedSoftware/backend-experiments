"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const taskCreateParser = zod_1.z.object({ text: zod_1.z.string() });
const taskDeleteParser = zod_1.z.object({ id: zod_1.z.string() });
const taskUpdateParser = zod_1.z.object({ id: zod_1.z.string(), text: zod_1.z.string().optional(), completed: zod_1.z.boolean().optional() });
const query = (action, parser) => ({
    mutation: false,
    parser,
    action
});
const mutation = (action, parser) => ({
    mutation: true,
    parser,
    action
});
exports.tasks = {
    post: mutation((input) => prisma.task.create({ data: input }), taskCreateParser),
    get: query(prisma.task.findMany),
    delete: mutation((input) => prisma.task.delete({
        where: input,
    }), taskDeleteParser),
    put: mutation((input) => prisma.task.update({
        where: { id: input.id },
        data: input
    }), taskUpdateParser),
    "clear-completed": mutation(async () => {
        await prisma.task.deleteMany({
            where: { completed: true },
        });
        prisma.task.findMany();
    })
};
const rules = { tasks: exports.tasks };
exports.default = rules;
