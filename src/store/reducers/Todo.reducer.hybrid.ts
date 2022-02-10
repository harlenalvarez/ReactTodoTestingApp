// Helper methods from toolkit
import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import { TodoItemType } from "../../components/todo-component/TodoItem";
import { Action, SaveTodoType, initialState } from './Todo.types';
import { TodoApi } from '../../api/todos.api';


// This is one of the helper methods
// that will create the action for you
export const TodoAction = {
    Add: createAction('Add'),
    Save: createAction<SaveTodoType>('Save'),
    Remove: createAction<number>('Remove')
}

// This is custom to toolkit as thunks are a pain to write, but we can see here is just like any other function
// first generic is the return type, second is the argument, the thunk api just exposes if it failed or not
export const SaveTodoAsync = createAsyncThunk<SaveTodoType, SaveTodoType>(TodoAction.Save.type, async ({index, savedItem}, thunkApi) => {
    await TodoApi.SetTodo(index, savedItem);
    return {index, savedItem};
});

// Here I'm showing a basic reducer using the action from create action
// and the createThunk method
export function TodoReducerLegacy(state: TodoItemType[] = initialState, action: Action){
    switch(action.type){

        // The only change here is that we want the text so we use the type prop
        case TodoAction.Add.type:
            return [ ...state, { isComplete: false, todo: '' }];

        // This is using the thunk so we use one of the 3 states, pending, fulfilled or rejected
        case SaveTodoAsync.fulfilled.type:
            if(!action.payload?.savedItem?.todo) return state;
            const clonedList = [...state];
            clonedList[action.payload?.index] = action.payload?.savedItem;
            return clonedList;

        // Only change here is that we want the text so we use the prop
        case TodoAction.Remove.type:
            const newList = [...state];
            newList.splice(action.payload, 1);
            return newList;
            
        default:
            return state;
    }
}

// This is the create reducer helper method
export const TodoReducer = createReducer<TodoItemType[]>(initialState, builder => {
    builder
    // this is similar to a case statement
    .addCase<any, Action>(TodoAction.Add, (state, action) => {
        // we don't have to worry about immutability as this uses a library to do it for us
        state.push({isComplete: false, todo: ''});
    })
    .addCase<any, Action>(SaveTodoAsync.fulfilled, (state, action)=>{
        if(!action.payload?.savedItem?.todo) return state;
        state[action.payload?.index] = action.payload?.savedItem;
    })
    .addCase<any, Action>(TodoAction.Remove, (state, action) => {
        state.splice(action.payload, 1);
    })
    .addDefaultCase((state, action) => state);
});