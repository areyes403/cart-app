import { createAction, props } from "@ngrx/store";

export const load = createAction('load');
export const findAll = createAction('load',props<{products: any}>());