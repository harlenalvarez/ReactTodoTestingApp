// Helper methods from toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Action, SaveTodoType, initialState } from './Todo.types';
import { TodoApi } from '../../api/todos.api';


// This is custom to toolkit as thunks are a pain to write, but we can see here is just like any other function
// first generic is the return type, second is the argument, the thunk api just exposes if it failed or not
export const SaveTodoAsync = createAsyncThunk<SaveTodoType, SaveTodoType>('ThisNameDoesnotMatterAnyMore', async ({index, savedItem}, thunkApi) => {
    await TodoApi.SetTodo(index, savedItem);
    return {index, savedItem};
});


// This is the slice syntax, essentially it combines createAction and createReducer into a more condence method
// The reducer, because its already an action it's added into the extra reducers portion similar to how is added using createReducer
// And Last thing to point out is that there is no need for a default case statement
const slice = createSlice({
    name: 'TodoSliceName',
    initialState,
    reducers:{
        Add: (state) =>  { 
            state.push({ isComplete: false, todo: '' }); 
        },
        Remove: (state, action) => { state.splice(action.payload, 1); }
    },
    extraReducers: builder => 
    builder.addCase<any, Action>(SaveTodoAsync.fulfilled, (state, action)=>{
        if(!action.payload?.savedItem?.todo) return state;
        state[action.payload?.index] = action.payload?.savedItem;
    })
});

export const TodoReducer = slice.reducer;
export const TodoAction = slice.actions;