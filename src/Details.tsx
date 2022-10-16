import { useEffect, useState } from 'react';
import { params, todo } from './types';
import { ObservableTodoStore } from './TodoStore';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { motion } from 'framer-motion';

const Details = observer(({ store }: { store: ObservableTodoStore }) => {
  const { id } = useParams<params>();

  const [detailsTodo, setDetailsTodo] = useState<todo>();

  useEffect(() => {
    store.getTodo(id!);
    setDetailsTodo(store.selectedTodo);
  }, [id, store.todos.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="details-container"
    >
      {detailsTodo !== undefined && store.isLoading === false ? (
        <div className="details">
          <div className="title">
            <h3>{detailsTodo!.title}</h3>
          </div>
          <div className="description">
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
      ) : null}
    </motion.div>
  );
});

export default Details;
