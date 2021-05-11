import { z } from 'zod'

export const task = {
    create: z.object({ text: z.string() })
}
export type TaskCreate = z.infer<typeof task.create>;

const parsers : Record<string, any> = { task }
export default parsers
