import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Todo from './Todo';
import { ObservableTodoStore } from './TodoStore';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import logo from './logo.png';
import { motion } from 'framer-motion';
import { GridLoader } from 'react-spinners';

const List = observer(({ store }: { store: ObservableTodoStore }) => {
  const navigate = useNavigate();
  let location = useLocation();

  const [showAddButton, setShowAddButton] = useState<boolean>(true);

  useEffect(() => {
    store.getTodos();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  }, [location.pathname]);

  return (
    <div className="main-container">
      <div className="main-title">
        <h1>Todo App</h1>
        <img src={logo} alt="logo" />
      </div>
      <div className="content">
        <div className="left-container">
          <Outlet />
        </div>
        <div className="right-container">
          {store.isLoading ? (
            <div className="loading">
              <GridLoader
                color={'#019edc'}
                loading={store.isLoading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div>
              <motion.div
                className="add-button-box"
                whileHover={{ scale: 1.1 }}
              >
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
                )}
              </motion.div>
              <div className=" cards-container ">
                {store.todos.map((todo) => (
                  <Todo todo={todo} store={store} key={todo.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default List;
