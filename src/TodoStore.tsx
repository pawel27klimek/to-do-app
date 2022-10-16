import { makeObservable, observable, action, runInAction } from 'mobx';
import { todo } from './types';

const testData = [
  {
    id: '56ba7c75-b51c-480b-badb-45ce531ebdab',
    title: 'Lorem Ipsum is simply dummy te',
    description:
      'Lorem Ipsum is simply dummy text of the printing a…s survived not only five centuries, but also the ',
    createdAt:
      'Sun Oct 16 2022 21:06:50 GMT+0200 (Central European Summer Time)',
    deadline: '2022-10-23',
  },
  {
    id: '363fba6a-6bc5-4bc8-af1c-a81ee6dadb0f',
    title: 'Lorem Ipsum is simply dummy te',
    description:
      'Lorem Ipsum is simply dummy text of the printing a…s survived not only five centuries, but also the ',
    createdAt:
      'Sun Oct 16 2022 21:07:41 GMT+0200 (Central European Summer Time)',
    deadline: '2022-10-23',
  },
  {
    id: 'd58e14b1-0ed4-42d4-9119-0257453ae02b',
    title: 'Lorem Ipsum is simply dummy te',
    description:
      'Lorem Ipsum is simply dummy text of the printing a…s survived not only five centuries, but also the ',
    createdAt:
      'Sun Oct 16 2022 21:08:17 GMT+0200 (Central European Summer Time)',
    deadline: '2022-10-23',
  },
];

export class ObservableTodoStore {
  todos: todo[] = [];
  isLoading: boolean = false;
  selectedTodo: todo | undefined;

  constructor() {
    makeObservable(this, {
      todos: observable,
      isLoading: observable,
      selectedTodo: observable,
      getTodos: action,
      getTodo: action,
      addTodo: action,
      deleteTodo: action,
      editTodo: action,
    });
  }

  async getTodos() {
    try {
      if (!localStorage.getItem('saved_state')) {
        localStorage.setItem('saved_state', JSON.stringify(testData));
      }
      this.isLoading = true;
      const receivedTodos = localStorage.getItem('saved_state')!;
      const formatedTodos: todo[] = await JSON.parse(receivedTodos);
      setTimeout(() => {
        runInAction(() => {
          this.todos = formatedTodos;
          this.isLoading = false;
        });
      }, 1000);
    } catch (e) {}
  }

  getTodo(id: string) {
    try {
      const selected = this.todos.find((todo) => todo.id === id);
      this.selectedTodo = selected;
    } catch (e) {}
  }

  addTodo({ id, title, description, createdAt, deadline }: todo) {
    try {
      this.isLoading = true;
      const newTodo = {
        id: id,
        title: title,
        description: description,
        createdAt: createdAt,
        deadline: deadline,
      };
      setTimeout(() => {
        runInAction(() => {
          this.todos.unshift(newTodo);
          localStorage.setItem('saved_state', JSON.stringify(this.todos));
          this.isLoading = false;
        });
      }, 1000);
    } catch (e) {}
  }

  deleteTodo(id: string, paramsId: string) {
    try {
      const updatedTodos = this.todos.filter((todo) => todo.id !== id);
      this.todos = updatedTodos;
      localStorage.setItem('saved_state', JSON.stringify(this.todos));
      if (id === paramsId) {
        return false;
      }
      return true;
    } catch (e) {}
  }

  editTodo({ id, title, description, createdAt, deadline }: todo) {
    try {
      this.isLoading = true;

      const updatedarray = this.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { id, title, description, createdAt, deadline };
      });
      this.todos = updatedarray;
      setTimeout(() => {
        runInAction(() => {
          localStorage.setItem('saved_state', JSON.stringify(this.todos));
          this.isLoading = false;
        });
      }, 1000);
    } catch (e) {}
  }
}

export const observableTodoStore = new ObservableTodoStore();
