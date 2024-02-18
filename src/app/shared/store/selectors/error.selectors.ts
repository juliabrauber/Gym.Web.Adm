import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.state';
import { ErrorState } from '../models/error.state';

export const selectError = createSelector(
    (state: AppState) => state.errorState,
    (state: ErrorState) => state
);