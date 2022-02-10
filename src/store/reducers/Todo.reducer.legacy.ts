import { TodoItemType } from "../../components/todo-component/TodoItem";
import { Action, initialState } from './Todo.types';

// basic action type
export const TodoAction = {
    Add: 'ADD',
    Save: 'SAVE',
    Remove: 'REMOVE'
}

// basic reducer
export function TodoReducer(state: TodoItemType[] = initialState, action: Action){
    switch(action.type){
        case TodoAction.Add:
            return [ ...state, { isComplete: false, todo: '' }];

        case TodoAction.Save:
            if(!action.payload?.savedItem?.todo) return state;
            const clonedList = [...state];
            clonedList[action.payload?.index] = action.payload?.savedItem;
            return clonedList;

        case TodoAction.Remove:
            const newList = [...state];
            newList.splice(action.payload, 1);
            return newList;

        default:
            return state;
    }
}
