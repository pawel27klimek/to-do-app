import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { todo } from './types';
import { observer } from 'mobx-react-lite';
import { ObservableTodoStore } from './TodoStore';
import { motion } from 'framer-motion';

const Todo = observer(
  ({ todo, store }: { todo: todo; store: ObservableTodoStore }) => {
    const navigate = useNavigate();
    const paramsId = useParams().id!;

    const handleSelect = () => {
      navigate(`/${todo.id}`);
    };

    const handleDelete = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      event.stopPropagation();
      const routeIdPresent = store.deleteTodo(todo.id, paramsId);
      if (!routeIdPresent) {
        navigate('/');
      }
    };

    const handleEdit = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      event.stopPropagation();
      navigate(`/${todo.id}/edit`);
    };

    return (
      <motion.div
        className="card"
        onClick={handleSelect}
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-title">{todo.title}</div>
        <div className="card-buttons">
          <FiEdit3
            className="edit-button"
            color="#271c6c"
            onClick={(event) => handleEdit(event)}
          />
          <FiTrash2
            className="delete-button"
            onClick={(event) => handleDelete(event)}
          />
        </div>
      </motion.div>
    );
  }
);

export default Todo;
