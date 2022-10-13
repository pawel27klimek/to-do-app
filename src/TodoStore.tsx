import {
  makeObservable,
  observable,
  action,
  runInAction,
  computed,
  autorun,
} from 'mobx';
import { MobXGlobals } from 'mobx/dist/internal';
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
    // {
    //   id: 0,
    //   title: 'The first one',
    //   description: 'First short not long description',
    //   createdAt: new Date(),
    //   deadline: '2022-10-09',
    // },
    // {
    //   id: 1,
    //   title: 'The second one',
    //   description: 'Second short not long description',
    //   createdAt: new Date(),
    //   deadline: '2022-10-09',
    // },
    // {
    //   id: 2,
    //   title: 'The third one',
    //   description: 'Third short not long description',
    //   createdAt: new Date(),
    //   deadline: '2022-10-09',
    // },
  ];

  // moze undefined albo null??

  // this.todos[0].id czy 0????
  selectedTodoId: number | undefined = 0; //this.todos[0].id;
  isLoading: boolean = false;
  // firstRun: boolean = true;

  constructor() {
    makeObservable(this, {
      todos: observable,
      selectedTodoId: observable,
      isLoading: observable,
      addTodo: action,
      deleteTodo: action,
      editTodo: action,
      setSelectedTodoId: action,
      selectedTodo: computed,
    });
    autorun(async () => {
      // dzięki firstrun przy odświezaniu nie odpala funkcji i dzięki temu nie ma loadingu
      // if (this.firstRun) {
      this.isLoading = true;
      const receivedTodos = await localStorage.getItem('saved_state')!;
      const parsedTodos = await JSON.parse(receivedTodos);
      const formatedTodos: todo[] = parsedTodos.map(
        (loadedTodo: loadedTodo) => ({
          ...loadedTodo,
          id: parseInt(loadedTodo.id),
          createdAt: new Date(loadedTodo.createdAt),
        })
      );
      // setTimeout is simulating big size data loading
      setTimeout(() => {
        runInAction(() => {
          this.todos = formatedTodos;
          this.isLoading = false;
          // if (this.todos.length > 0) {
          // this.selectedTodoId = this.selectedTodo!.id;
          // }
        });
      }, 1000);

      // }
    });
  }

  get selectedTodo() {
    const selectedTodo = this.todos.find(
      (todo) => todo.id === this.selectedTodoId
    );
    return selectedTodo;
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

  async deleteTodo(id: number) {
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

  async editTodo({ id, title, description, createdAt, deadline }: todo) {
    try {
      this.isLoading = true;

      const updatedarray = this.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { id, title, description, createdAt, deadline };
      });
      this.todos = updatedarray;
      this.selectedTodoId = id;

      this.isLoading = false;
      localStorage.setItem('saved_state', JSON.stringify(this.todos));
    } catch (e) {}
  }

  setSelectedTodoId(id: number) {
    try {
      this.selectedTodoId = id;
    } catch (e) {}
  }
}

export const observableTodoStore = new ObservableTodoStore();
