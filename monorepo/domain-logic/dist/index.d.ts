import type { ZodTypeAny } from 'zod';
declare type Result = {
    success: true;
    data: any;
} | {
    success: false;
    errors: any;
};
export declare type ActionResult = Result | Promise<Result>;
export declare const onResult: (onSuccess: (r: any) => any, onError: (r: any) => any, r: Result) => any;
export declare const success: (r: any) => Result;
export declare const error: (r: any) => Result;
export declare type Action = {
    mutation: boolean;
    parser?: ZodTypeAny;
    action: (input: any) => ActionResult;
};
export declare type Actions = Record<string, Action>;
export declare const tasks: Actions;
export declare type DomainActions = Record<string, Actions>;
declare const rules: DomainActions;
export declare const findAction: (namespace: string, actionName: string) => Action | undefined;
export default rules;
