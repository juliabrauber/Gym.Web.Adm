import {
    Action,
    createReducer,
    on
} from '@ngrx/store';

import { errorActions } from '../actions/error.actions';
import { ErrorState } from '../models/error.state';

export const errorInitialState: ErrorState = {
    code: 500,
    description: 'Ocorreu um erro inesperado =/',
    title: 'Ocorreu um erro.'
}

const _errorReducer = createReducer(
    errorInitialState,    
    on(errorActions.trigger, (state, action) => ({ ...state, ...action })),        
);

export function errorReducer(state: ErrorState | undefined, action: Action) {     
    return _errorReducer(state, action);
}
