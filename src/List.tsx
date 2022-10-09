import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FiPlusSquare } from 'react-icons/fi';
import Todo from './Todo';
import { ObservableTodoStore } from './TodoStore';

const List = observer(({ store }: { store: ObservableTodoStore }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Outlet />
      </div>
      <div>
        <h1>Welcome</h1>

        <div>
          <FiPlusSquare onClick={() => navigate('add')} />

          <div>
            Lista:{' '}
            {store.todos.map((todo) => (
              <Todo todo={todo} key={todo.id} store={store} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default List;
