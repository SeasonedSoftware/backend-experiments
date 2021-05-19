import type { ZodTypeAny } from 'zod';
export declare type Action = {
    mutation: boolean;
    parser?: ZodTypeAny;
    action: (input: any) => any;
};
declare type Actions = Record<string, Action>;
export declare const tasks: Actions;
declare const rules: Record<string, Actions>;
export default rules;
