import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useNavigate } from 'react-router-dom';

const Add = observer(({ store }: { store: ObservableTodoStore }) => {
  const navigate = useNavigate();

  const defaultDeadline = () => {
    const date = new Date();
    const dateInAWeek = new Date(date.setDate(date.getDate() + 7));
    const year = dateInAWeek.toLocaleString('default', { year: 'numeric' });
    const month = dateInAWeek.toLocaleString('default', { month: '2-digit' });
    const day = dateInAWeek.toLocaleString('default', { day: '2-digit' });
    return `${year}-${month}-${day}`;
  };

  const [newTodo, setNewTodo] = useState<todo>({
    id: Date.now(),
    title: '',
    description: '',
    createdAt: new Date(),
    deadline: defaultDeadline(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.addTodo(newTodo);
    navigate(`/${store.selectedTodoId}`);
    setNewTodo({
      id: Date.now(),
      title: '',
      description: '',
      createdAt: new Date(),
      deadline: defaultDeadline(),
    });
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h3>Add</h3>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newTodo.title}
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
            value={newTodo.description}
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
            value={newTodo.deadline}
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

export default Add;
