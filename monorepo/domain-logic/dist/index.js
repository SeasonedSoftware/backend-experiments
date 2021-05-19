"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAction = exports.tasks = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const find_1 = __importDefault(require("lodash/find"));
const prisma = new client_1.PrismaClient();
const taskCreateParser = zod_1.z.object({ text: zod_1.z.string() });
const taskDeleteParser = zod_1.z.object({ id: zod_1.z.string() });
const taskUpdateParser = zod_1.z.object({ id: zod_1.z.string(), text: zod_1.z.string().optional(), completed: zod_1.z.boolean().optional() });
const query = (name, action, parser) => ({
    name,
    mutation: false,
    parser,
    action
});
const mutation = (name, action, parser) => ({
    name,
    mutation: true,
    parser,
    action
});
exports.tasks = [
    mutation("post", (input) => prisma.task.create({ data: input }), taskCreateParser),
    query("get", prisma.task.findMany),
    mutation("delete", (input) => prisma.task.delete({
        where: input,
    }), taskDeleteParser),
    mutation("put", (input) => prisma.task.update({
        where: { id: input.id },
        data: input
    }), taskUpdateParser),
    query("send-completed-notifications", (input) => {
        console.log({ hello: "world" });
    }),
    mutation("clear-completed", async () => {
        await prisma.task.deleteMany({
            where: { completed: true },
        });
        prisma.task.findMany();
    })
];
const rules = { tasks: exports.tasks };
const findAction = (namespace, actionName) => {
    if (!rules[namespace])
        return undefined;
    return find_1.default(rules[namespace], (r) => (r.name === actionName));
};
exports.findAction = findAction;
exports.default = rules;
