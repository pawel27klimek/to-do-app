import React, { useEffect, useState } from 'react';
import { ObservableTodoStore } from './TodoStore';
import { observer } from 'mobx-react-lite';
import { todo } from './types';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = observer(({ store }: { store: ObservableTodoStore }) => {
  // const params = useParams();
  // const id: number = parseInt(params.id!);
  // ???????????

  // if (store.todos.length > 0) {
  //   selectedTodo = store.todos.find(
  //     (todo) => todo.id === store.selectedTodoId
  //   )!;
  // }
  const navigate = useNavigate();
  const [editTodo, setEditTodo] = useState<todo>({
    id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    deadline: '',
  });
  useEffect(() => {
    if (store.selectedTodo !== undefined) {
      const selected = store.selectedTodo;
      setEditTodo(selected);
    }
  }, [store.selectedTodoId]);

  // useEffect(() => {
  //   const selectedTodo = store.todos.find(
  //     (todo) => todo.id === store.selectedTodoId
  //   );
  // }, [store.selectedTodoId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.editTodo(editTodo);
    // ?? ?? czy moze w navigate uzyc editTodo.id??? wartość jest taka sama
    navigate(`/${store.selectedTodoId}`);
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h3>Edit</h3>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editTodo.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
            }}
            autoComplete="off"
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={editTodo.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
            }}
            autoComplete="off"
          />
        </label>
        <label>
          Deadline:
          <input
            type="date"
            name="deadline"
            value={editTodo.deadline.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
});

export default Edit;
