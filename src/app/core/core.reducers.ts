import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { responseCacheReducer, ResponseCacheState } from './cache/response-cache.reducer';
import { objectCacheReducer, ObjectCacheState } from './cache/object-cache.reducer';
import { uuidIndexReducer, UUIDIndexState } from './index/uuid-index.reducer';
import { requestReducer, RequestState } from './data/request.reducer';

export interface CoreState {
  'data/object': ObjectCacheState,
  'data/response': ResponseCacheState,
  'data/request': RequestState,
  'index/uuid': UUIDIndexState
}

export const coreReducers: ActionReducerMap<CoreState> = {
  'data/object': objectCacheReducer,
  'data/response': responseCacheReducer,
  'data/request': requestReducer,
  'index/uuid': uuidIndexReducer
};

export const coreSelector = createFeatureSelector<CoreState>('core');