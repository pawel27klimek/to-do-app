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
    }
    setTimeout(() => {
      if (store.todos.length === 0) {
        navigate('/');
      }
    }, 1000);
  }, [id, store.todos.length]);

  return (
    <div className="left-container">
      {detailsTodo !== undefined && store.isLoading === false ? (
        <div className="details-container">
          <h2>Details</h2>

          <div className="title">
            {/* Title: */}
            <h4>{detailsTodo!.title}</h4>
          </div>
          <div className="description">
            {/* Description: */}
            <span>{detailsTodo!.description}</span>
          </div>
          <div className="date-details">
            <div>
              Created:{' '}
              <span>
                {formatDistanceToNow(new Date(detailsTodo!.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div>
              Deadline:{' '}
              <span>
                {formatDistanceToNow(new Date(detailsTodo!.deadline), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});

export default Details;
