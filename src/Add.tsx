import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

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
    id: uuidv4(),
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="add-container"
    >
      <h2>Add new</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          inputProps={{ maxLength: 30 }}
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
          inputProps={{ maxLength: 300 }}
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
    </motion.div>
  );
});

export default Add;
