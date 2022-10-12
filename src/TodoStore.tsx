import {
  makeObservable,
  observable,
  action,
  runInAction,
  computed,
  autorun,
} from 'mobx';
import { todo } from './types';

type loadedTodo = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  deadline: string;
};

export class ObservableTodoStore {
  todos: todo[] = [
    {
      id: 0,
      title: 'The first one',
      description: 'First short not long description',
      createdAt: new Date(),
      deadline: '2022-10-09',
    },
    {
      id: 1,
      title: 'The second one',
      description: 'Second short not long description',
      createdAt: new Date(),
      deadline: '2022-10-09',
    },
    {
      id: 2,
      title: 'The third one',
      description: 'Third short not long description',
      createdAt: new Date(),
      deadline: '2022-10-09',
    },
  ];

  // moze undefined albo null??

  // this.todos[0].id czy 0????
  selectedTodoId: number = this.todos[0].id;
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      todos: observable,
      selectedTodoId: observable,
      isLoading: observable,
      addTodo: action,
      deleteTodo: action,
      editTodo: action,
      setSelectedtodoId: action,
      getTodos: action,
    });
    autorun(() => {
      localStorage.setItem('saved_state', JSON.stringify(this.todos));
    });
  }

  async getTodos() {
    try {
      // setTimeout is simulating big size data loading
      this.isLoading = true;

      setTimeout(() => {
        const savedTodos = localStorage.getItem('saved_state')!;
        const parsedSavedTodos = JSON.parse(savedTodos);
        const loadedTodos: todo[] = parsedSavedTodos.map(
          (loadedTodo: loadedTodo) => ({
            ...loadedTodo,
            id: parseInt(loadedTodo.id),
            createdAt: new Date(loadedTodo.createdAt),
          })
        );
        runInAction(() => {
          this.todos = loadedTodos;
          this.isLoading = false;
        });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  }

  addTodo({ id, title, description, createdAt, deadline }: todo) {
    try {
      this.isLoading = true;
      setTimeout(() => {
        runInAction(() => {
          this.todos.push({
            id: id,
            title: title,
            description: description,
            createdAt: createdAt,
            deadline: deadline,
          });
          localStorage.setItem('saved_state', JSON.stringify(this.todos));
          this.selectedTodoId = id;
          this.isLoading = false;
        });
      }, 1000);
    } catch (e) {}
  }

  deleteTodo(id: number) {
    const updatedTodos = this.todos.filter((todo) => todo.id !== id);
    if (updatedTodos.length > 0) {
      const idFirstElementAfterUpdate = updatedTodos[0].id;
      this.selectedTodoId = idFirstElementAfterUpdate;
    } else {
      this.selectedTodoId = 0;
    }
    this.todos = updatedTodos;
    localStorage.setItem('saved_state', JSON.stringify(this.todos));
  }

  async editTodo({ id, title, description, createdAt, deadline }: todo) {
    this.setSelectedtodoId(id);
    const updatedarray = this.todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }
      return { id, title, description, createdAt, deadline };
    });
    this.todos = updatedarray;
    await localStorage.setItem('saved_state', JSON.stringify(this.todos));
  }

  setSelectedtodoId(id: number) {
    this.selectedTodoId = id;
    // console.log(this.setSelectedtodoId);
  }
}

export const observableTodoStore = new ObservableTodoStore();
