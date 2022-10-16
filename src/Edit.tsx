import React, { useEffect, useState } from 'react';
import { ObservableTodoStore } from './TodoStore';
import { observer } from 'mobx-react-lite';
import { params, todo } from './types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Edit = observer(({ store }: { store: ObservableTodoStore }) => {
  const { id } = useParams<params>();
  const navigate = useNavigate();
  const location = useLocation();

  const [editTodo, setEditTodo] = useState<todo>({
    id: '',
    title: '',
    description: '',
    createdAt: '',
    deadline: '',
  });

  useEffect(() => {
    store.getTodo(id!);
    if (store.selectedTodo !== undefined) {
      setEditTodo(store.selectedTodo);
    }
  }, [id, store.todos.length]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.editTodo(editTodo);
    navigate(`/${id}`);
  };

  return (
    <div className="left-container">
      <h2>Edit</h2>

      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          inputProps={{ maxLength: 20 }}
          className="title"
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          value={editTodo.title}
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
          value={editTodo.description}
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
          value={editTodo.deadline}
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

export default Edit;
