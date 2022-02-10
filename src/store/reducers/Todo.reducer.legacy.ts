import { TodoItemType } from "../../components/todo-component/TodoItem";
import { Action, initialState, SaveTodoType } from './Todo.types';

// basic action type
export const TodoActionTypes = {
    Add: 'ADD',
    Save: 'SAVE',
    Remove: 'REMOVE'
}

// basic action creators
export const TodoAction = {
    Add: () => ({type: TodoActionTypes.Add}),
    Save: (payload: SaveTodoType) => ({type: TodoActionTypes.Save, payload }),
    Remove: (index:number) => ({type: TodoActionTypes.Remove, payload: index})
}

// basic reducer
export function TodoReducer(state: TodoItemType[] = initialState, action: Action){
    switch(action.type){
        case TodoActionTypes.Add:
            return [ ...state, { isComplete: false, todo: '' }];

        case TodoActionTypes.Save:
            if(!action.payload?.savedItem?.todo) return state;
            const clonedList = [...state];
            clonedList[action.payload?.index] = action.payload?.savedItem;
            return clonedList;

        case TodoActionTypes.Remove:
            const newList = [...state];
            newList.splice(action.payload, 1);
            return newList;

        default:
            return state;
    }
}
