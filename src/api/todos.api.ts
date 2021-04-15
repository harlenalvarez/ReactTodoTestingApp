import { TodoItemType } from "../components/todo-component/TodoItem";

class TodoIndexDbApi {
  
  constructor() {
    this.OpenDB = this.OpenDB.bind(this);
    this.SetTodo = this.SetTodo.bind(this);
    this.RemoveTodo = this.RemoveTodo.bind(this);
    this.GetAll = this.GetAll.bind(this);
  }
  OpenDB() : Promise<string | IDBDatabase> {
    const request = window.indexedDB.open('TodoDb', 1);
    const openPromise = new Promise<string | IDBDatabase>((resolve, reject) => {
     request.onupgradeneeded = (event) => {
       var db = request.result;
       if(event.oldVersion === 0) {
         db.createObjectStore('todos');
       }
     } 
     request.onerror = () => reject(request.error?.message);
     request.onsuccess = () => resolve(request.result);
    });
    return openPromise;
  }

  async SetTodo(index: number, todo: TodoItemType) : Promise<TodoItemType | string> {
    const db = await this.OpenDB() as IDBDatabase;
    const todos = db
    .transaction('todos', 'readwrite')
    .objectStore('todos');

    const request = todos.put(todo, index);
    return new Promise<TodoItemType | string>((resolve, reject) => {
      request.onerror = () => reject(request.error?.message);
      request.onsuccess = () => resolve(todo);
    });
  }

  async RemoveTodo(index: number) : Promise<void | string> {
    const db = await this.OpenDB() as IDBDatabase;
    const todos = db
    .transaction('todos', 'readwrite')
    .objectStore('todos');

    const request = todos.delete(index);
    return new Promise<void | string>((resolve, reject) => {
      request.onerror = () => reject(request.error?.message);
      request.onsuccess = () => resolve();
    });
  }

  async GetAll() : Promise<TodoItemType[] | string> {
    const db = await this.OpenDB() as IDBDatabase;
    const todos = db
    .transaction('todos', 'readonly')
    .objectStore('todos');

    const request = todos.getAll();
    return new Promise<TodoItemType[] | string>((resolve, reject) => {
      request.onerror = () => reject(request.error?.message);
      request.onsuccess = () => resolve(request.result);
    });
  }

}
const TodoApi = new TodoIndexDbApi();
export { TodoApi };