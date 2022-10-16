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
  selectedTodoId: string | undefined = ''; //this.todos[0].id;
  isLoading: boolean = false;
  selectedTodo: todo | undefined;

  constructor() {
    makeObservable(this, {
      todos: observable,
      selectedTodoId: observable,
      isLoading: observable,
      selectedTodo: observable,
      addTodo: action,
      deleteTodo: action,
      editTodo: action,
      setSelectedTodo: action,
      setSelectedTodoId: action,
    });
  }

  async getTodos() {
    runInAction(() => (this.isLoading = true));
    const receivedTodos = localStorage.getItem('saved_state')!;
    const formatedTodos: todo[] = await JSON.parse(receivedTodos);
    setTimeout(() => {
      runInAction(() => {
        this.todos = formatedTodos;
        this.isLoading = false;
      });
    }, 1000);
  }

  setSelectedTodo() {
    try {
      const selectedTodo = this.todos.find(
        (todo) => todo.id === this.selectedTodoId
      );
      this.selectedTodo = selectedTodo;
    } catch (e) {}
  }

  setSelectedTodoId(id: string) {
    try {
      this.selectedTodoId = id;
    } catch (e) {}
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
          this.selectedTodoId = id;
          localStorage.setItem('saved_state', JSON.stringify(this.todos));

          this.isLoading = false;
        });
      }, 1000);
    } catch (e) {}
  }

  deleteTodo(id: string) {
    try {
      const updatedTodos = this.todos.filter((todo) => todo.id !== id);
      if (updatedTodos.length > 0) {
        const idFirstElementAfterUpdate = updatedTodos[0].id;
        this.selectedTodoId = idFirstElementAfterUpdate;
      } else {
        this.selectedTodoId = undefined;
      }
      this.todos = updatedTodos;
      localStorage.setItem('saved_state', JSON.stringify(this.todos));
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
      setTimeout(() => {
        runInAction(() => {
          this.todos = updatedarray;
          this.selectedTodoId = id;
          localStorage.setItem('saved_state', JSON.stringify(this.todos));
          this.isLoading = false;
        });
      }, 1000);
    } catch (e) {}
  }
}

export const observableTodoStore = new ObservableTodoStore();
