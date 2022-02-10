import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { TodoReducer as LegacyReducer } from './reducers/Todo.reducer.legacy';
import { TodoReducer as HybridReducer } from './reducers/Todo.reducer.hybrid';
import { TodoReducer as SliceReducer } from './reducers/Todo.reducer.slice';

export const RootStore = configureStore({
    reducer:{
        todos: SliceReducer
    }
});

// This is typescript specific, we are extracting the return
// types so we can use in the hooks
export type RootState = ReturnType<typeof RootStore.getState>;
export type AppDispatch = typeof RootStore.dispatch;


// Still typescript expecific, redux gives you the 
// useDispatch and useSelector hooks, but because we need 
// types we'll create our own hook to use.
// (AGAIN THIS IS TYPESSCIPT SPECIFIC)
export const useStoreDispatch = () => useDispatch<AppDispatch>();
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;