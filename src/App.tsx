import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Details from './Details';
import AddEdit from './AddEdit';
import List from './List';
import Layout from './Layout';

function App() {
  // const x = Symbol();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="addedit" element={<AddEdit />} />
        <Route path="details" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;
