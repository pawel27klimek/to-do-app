import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Details from './Details';
import Add from './Add';
import Edit from './Edit';
import List from './List';
import { observableTodoStore } from './TodoStore';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List store={observableTodoStore} />}>
            {/* zmiany które po uzyciu useEffect w List nie są potrzebne, tzn. są potrzebne dwa routy dla Details */}
            {/* <Route index element={<Details store={observableTodoStore} />} /> */}
            <Route path="add" element={<Add store={observableTodoStore} />} />
            <Route path=":id">
              <Route index element={<Details store={observableTodoStore} />} />
              <Route
                path="edit"
                element={<Edit store={observableTodoStore} />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Do rozkminy!!!
{
  /* <div className="App">
<BrowserRouter>
  <Navbar />
  <div className="pages">
    <Routes>
      <Route 
        path="/" 
        element={<Home />} 
      />
    </Routes>
  </div>
</BrowserRouter>
</div> */
}

export default App;
