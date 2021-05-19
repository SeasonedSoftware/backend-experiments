import type { ZodTypeAny } from 'zod';
export declare type Action = {
    mutation: boolean;
    parser?: ZodTypeAny;
    action: (input: any) => any;
};
export declare type Actions = Record<string, Action>;
export declare const tasks: Actions;
export declare type DomainActions = Record<string, Actions>;
declare const rules: DomainActions;
export declare const findAction: (namespace: string, actionName: string) => Action | undefined;
export default rules;
