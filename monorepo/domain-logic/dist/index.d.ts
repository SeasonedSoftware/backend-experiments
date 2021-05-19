import type { ZodTypeAny } from 'zod';
export declare type Action = {
    name: string;
    mutation: boolean;
    parser?: ZodTypeAny;
    action: (input: any) => any;
};
export declare const tasks: Action[];
declare const rules: Record<string, Action[]>;
export declare const findAction: (namespace: string, actionName: string) => Action | undefined;
export default rules;
