import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FiPlusSquare } from 'react-icons/fi';
import Todo from './Todo';
import { ObservableTodoStore } from './TodoStore';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

const List = observer(({ store }: { store: ObservableTodoStore }) => {
  const navigate = useNavigate();
  let location = useLocation();
  console.log(location.pathname);

  const [showAddButton, setShowAddButton] = useState<boolean>(true);

  useEffect(() => {
    store.getTodos();
  }, []);

  useEffect(() => {
    if (store.todos.length > 0 && store.selectedTodo === undefined) {
      const firstTodoId = store.todos[0].id;
      store.setSelectedTodo();
      navigate(`/${firstTodoId}`);
    }
  }, [store.todos.length]);

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  }, [location]);

  return (
    <div className="main-container">
      <div className="main-title">
        <h1>Todo App</h1>
      </div>
      <div className="content">
        {/* <div className="left-container"> */}
        <Outlet />
        {/* ????? if Outlet === undefined wyświetl coś innego??? zamist tego jest navigate na useEffect */}
        {/* </div> */}
        {store.isLoading ? (
          <div className="loading">is Loading...</div>
        ) : (
          <div className="right-container">
            {/* <div className="add-button-box"> */}
            <div className="add-button-box">
              {' '}
              {showAddButton && (
                <Button
                  className="add-button"
                  variant="contained"
                  onClick={() => {
                    navigate('add');
                  }}
                >
                  ADD NEW
                </Button>
              )}{' '}
            </div>
            {/* </div> */}
            <div className=" cards-container ">
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
