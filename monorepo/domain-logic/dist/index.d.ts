import type { ZodTypeAny } from 'zod';
import { either } from 'fp-ts';
declare type Error = {
    errors: Record<string, string>;
};
declare type Result = either.Either<Error, any>;
export declare type ActionResult = Result | Promise<Result>;
export declare const success: <E = never, A = never>(a: A) => either.Either<E, A>;
export declare const error: <E = never, A = never>(e: E) => either.Either<E, A>;
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
