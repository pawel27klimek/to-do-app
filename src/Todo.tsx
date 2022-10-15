import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { todo } from './types';
import { observer } from 'mobx-react-lite';
import { ObservableTodoStore } from './TodoStore';

const Todo = observer(
  ({ todo, store }: { todo: todo; store: ObservableTodoStore }) => {
    const navigate = useNavigate();

    const handleSelect = () => {
      store.setSelectedTodoId(todo.id);
      navigate(`/${todo.id}`);
    };

    const handleDelete = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      event.stopPropagation();
      store.deleteTodo(todo.id);
    };

    const handleEdit = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      event.stopPropagation();
      store.setSelectedTodoId(todo.id);
      navigate(`/${todo.id}/edit`);
    };

    return (
      <div className="card" onClick={handleSelect}>
        <div className="card-title">{todo.title}</div>
        <div className="card-buttons">
          <FiEdit3
            className="edit-button"
            color="#271c6c"
            onClick={(event) => handleEdit(event)}
          />
          <FiTrash2
            className="delete-button"
            // color="red"
            onClick={(event) => handleDelete(event)}
          />
        </div>
      </div>
    );
  }
);

export default Todo;
