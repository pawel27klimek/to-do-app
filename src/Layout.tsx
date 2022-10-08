import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import List from './List';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Outlet />
      </div>
      <div>
        <h1>Welcome</h1>
        <Link to="details">Details</Link>
        <Link to="addedit">AddEdit</Link>
        <List />
      </div>
    </div>
  );
};

export default Layout;
