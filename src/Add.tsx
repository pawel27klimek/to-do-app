import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Add = observer(({ store }: { store: ObservableTodoStore }) => {
  const navigate = useNavigate();

  const defaultDeadline = (date: Date, delta: number) => {
    const dateInAWeek = new Date(date.setDate(date.getDate() + delta));
    const year = dateInAWeek.toLocaleString('default', { year: 'numeric' });
    const month = dateInAWeek.toLocaleString('default', { month: '2-digit' });
    const day = dateInAWeek.toLocaleString('default', { day: '2-digit' });
    return `${year}-${month}-${day}`;
  };

  const [newTodo, setNewTodo] = useState<todo>({
    id: Date.now().toString(),
    title: '',
    description: '',
    createdAt: new Date().toString(),
    deadline: defaultDeadline(new Date(), 7),
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
    navigate(`/${newTodo.id}`);
    setNewTodo({
      id: Date.now().toString(),
      title: '',
      description: '',
      createdAt: '',
      deadline: '',
    });
  };

  return (
    <div className="left-container">
      <h2>Add new todo</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          inputProps={{ maxLength: 20 }}
          className="title"
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          value={newTodo.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />

        <TextField
          className="description"
          label="Description"
          variant="outlined"
          type="text"
          name="description"
          value={newTodo.description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
        <TextField
          className="deadline"
          variant="outlined"
          label="Deadline"
          type="date"
          name="dealine"
          value={newTodo.deadline}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
});

export default Add;
