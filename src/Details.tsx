import React, { useEffect, useState } from 'react';
import { todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Details = observer(({ store }: { store: ObservableTodoStore }) => {
  // const params = useParams();
  // const id: number = parseInt(params.id!);
  //?????????????
  let selectedTodo = {
    id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    deadline: '',
  };
  if (store.todos.length > 0) {
    selectedTodo = store.todos.find(
      (todo) => todo.id === store.selectedTodoId
    )!;
  }

  return (
    <div>
      <h1>Details</h1>

      {store.isLoading ? (
        <div></div>
      ) : (
        <div>
          <div>
            Title:
            <span>{selectedTodo.title}</span>
          </div>
          <div>
            Description:
            <span>{selectedTodo.description}</span>
          </div>
          <div>
            CreatedAt:
            <span>
              {formatDistanceToNow(selectedTodo!.createdAt, {
                addSuffix: true,
              })}{' '}
            </span>
          </div>
          <div>
            Deadline:
            <span>{selectedTodo.deadline}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Details;
