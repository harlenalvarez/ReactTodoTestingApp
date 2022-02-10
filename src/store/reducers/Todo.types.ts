import { TodoItemType } from "../../components/todo-component/TodoItem";

// basic typescript type for action type
export type Action = {
    type: string,
    payload?: any
}

// creating the save state type because I included the index
export type SaveTodoType = {
    index: number,
    savedItem: TodoItemType
}

// basic initial state
export const initialState: TodoItemType[] = [];