import {
    createAction,
    props
} from '@ngrx/store';

import { errorCode } from '../../type';

export const errorActions = {
    trigger: createAction('trigger', props<{         
        code: errorCode,
        description: string,
        title?: string
    }>())   
};
