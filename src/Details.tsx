import React from 'react';
import { todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useParams } from 'react-router-dom';

const Details = ({ store }: { store: ObservableTodoStore }) => {
  const params = useParams();
  const id = parseInt(params.id!);
  const selectedTodo = store.todos[id];
  return (
    <div>
      <h1>Details</h1>
      <div>
        Title:<span>{selectedTodo.title}</span>
      </div>
      <div>
        Description:<span>{selectedTodo.description}</span>
      </div>
      <div>
        CreatedAt:<span>{selectedTodo.createdAt.toString()}</span>
      </div>
      <div>
        Deadline:<span>{selectedTodo.deadline}</span>
      </div>
    </div>
  );
};

export default Details;
