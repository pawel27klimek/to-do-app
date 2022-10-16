import { Routes, Route } from 'react-router-dom';
import Details from './Details';
import Add from './Add';
import Edit from './Edit';
import List from './List';
import { observableTodoStore } from './TodoStore';

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<List store={observableTodoStore} />}>
          <Route path="add" element={<Add store={observableTodoStore} />} />
          <Route path=":id">
            <Route index element={<Details store={observableTodoStore} />} />
            <Route path="edit" element={<Edit store={observableTodoStore} />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
