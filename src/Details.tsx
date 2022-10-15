import { useEffect, useState } from 'react';
import { params, todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Details = observer(({ store }: { store: ObservableTodoStore }) => {
  const { id } = useParams<params>();
  const navigate = useNavigate();

  const [detailsTodo, setDetailsTodo] = useState<todo>();

  useEffect(() => {
    store.setSelectedTodoId(id!);
    store.setSelectedTodo();
    if (store.selectedTodo !== undefined) {
      const selected = store.selectedTodo;
      setDetailsTodo(selected);
      ///// taki syntax i obserwowane ???? moe samo id????
    } else if (store.todos.length === 0) {
      navigate('/');
    }
  }, [id, store.todos.length]);

  return (
    <div className="left-container">
      {detailsTodo !== undefined ? (
        <div>
          <h1>Details</h1>

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
              {formatDistanceToNow(new Date(detailsTodo!.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div>
            Deadline:
            <span>
              {formatDistanceToNow(new Date(detailsTodo!.deadline), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});

export default Details;
