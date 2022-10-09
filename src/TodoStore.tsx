import { makeObservable, autorun, observable, computed, action } from 'mobx';
import { todo } from './types';

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

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      deleteTodo: action,
    });
    autorun(() => console.log(this.todos));
  }

  addTodo({ id, title, description, createdAt, deadline }: todo) {
    this.todos.push({
      id: id,
      title: title,
      description: description,
      createdAt: createdAt,
      deadline: deadline,
    });
  }

  deleteTodo(id: number) {
    const updatedTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = updatedTodos;
  }
}

export const observableTodoStore = new ObservableTodoStore();
