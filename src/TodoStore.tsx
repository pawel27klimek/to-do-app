import { makeObservable, observable, action, runInAction } from 'mobx';
import { todo } from './types';

export class ObservableTodoStore {
  todos: todo[] = [
    // {
    //   id: '0',
    //   title: 'The first one',
    //   description: 'First short not long description',
    //   createdAt: '2022-10-09',
    //   deadline: '2022-10-09',
    // },
    // {
    //   id: '1',
    //   title: 'The second one',
    //   description: 'Second short not long description',
    //   createdAt: '2022-10-09',
    //   deadline: '2022-10-09',
    // },
    // {
    //   id: '2',
    //   title: 'The third one',
    //   description: 'Third short not long description',
    //   createdAt: '2022-10-09',
    //   deadline: '2022-10-09',
    // },
  ];
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
      this.isLoading = true;
      const receivedTodos = localStorage.getItem('saved_state')!;
      const formatedTodos: todo[] = await JSON.parse(receivedTodos);
      console.log('odpala się getTodos');
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
      setTimeout(() => {
        runInAction(() => {
          this.todos.unshift({
            id: id,
            title: title,
            description: description,
            createdAt: createdAt,
            deadline: deadline,
          });
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
