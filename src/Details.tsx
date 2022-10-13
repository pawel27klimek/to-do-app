import React, { useEffect, useState } from 'react';
import { todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

type todoDetails = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  deadline: string;
};

const Details = observer(({ store }: { store: ObservableTodoStore }) => {
  // const params = useParams();
  // const id: number = parseInt(params.id!);
  //?????????????

  const [showDetails, setShowDetails] = useState(false);
  const [detailsTodo, setDetailsTodo] = useState<todoDetails>();

  useEffect(() => {
    if (store.selectedTodo !== undefined) {
      const selected = store.selectedTodo;
      setDetailsTodo(selected);
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [store.selectedTodoId]);

  // if (store.todos.length > 0) {
  //   selectedTodo = store.todos.find(
  //     (todo) => todo.id === store.selectedTodoId
  //   )!;
  // }

  return (
    <div>
      <h1>Details</h1>

      {!showDetails ? (
        <div>Click on todo to see more details</div>
      ) : (
        <div>
          <div>
            Title:
            <span>{detailsTodo!.title}</span>
          </div>
          <div>
            Description:
            <span>{detailsTodo!.description}</span>
          </div>
          <div>
            CreatedAt:
            <span>
              {formatDistanceToNow(detailsTodo!.createdAt, {
                addSuffix: true,
              })}
            </span>
          </div>
          <div>
            Deadline:
            <span>{detailsTodo!.deadline}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Details;
