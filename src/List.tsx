import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FiPlusSquare } from 'react-icons/fi';
import Todo from './Todo';
import { ObservableTodoStore } from './TodoStore';
import { useEffect } from 'react';

const List = observer(({ store }: { store: ObservableTodoStore }) => {
  //useState do isloading
  const navigate = useNavigate();

  // ??????? jak store
  useEffect(() => {
    navigate(`/${store.selectedTodoId}`);
  }, []);
  //// ???? takie rozwiązanie routa ???? ////
  //// ???? zmiany w appie mogły, być nie potrzebne ???? ////
  useEffect(() => {
    store.getTodos();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Outlet />
        {/* if Outlet === null wyświetl coś innego??? */}
      </div>
      <div>
        <h1>Todos</h1>

        {store.isLoading ? (
          <div>is Loading...</div>
        ) : (
          <div>
            <div>
              <FiPlusSquare onClick={() => navigate('add')} />
            </div>
            <div>
              Lista:{' '}
              {store.todos.map((todo) => (
                <Todo todo={todo} store={store} key={todo.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default List;
