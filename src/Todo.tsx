import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { todo } from './types';
import { observer } from 'mobx-react-lite';
import { ObservableTodoStore } from './TodoStore';

const Todo = observer(
  ({ todo, store }: { todo: todo; store: ObservableTodoStore }) => {
    const navigate = useNavigate();

    const handleDelete = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      event.stopPropagation();
      store.deleteTodo(todo.id);
    };

    return (
      <div
        style={{ border: 'solid black' }}
        onClick={() => navigate(`/${todo.id}`)}
      >
        {/* <FiEdit3
        onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => {
          event.stopPropagation();
          navigate(`/${todo.id}/edit`);
        }}
      /> */}
        <FiTrash2 onClick={(event) => handleDelete(event)} />
        title:{todo.title}
      </div>
    );
  }
);

export default Todo;
