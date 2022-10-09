import React from 'react';
import { observableTodoStore } from './TodoStore';
import { todo } from './types';

const Edit = ({ store }: { store: typeof observableTodoStore }) => {
  return (
    <div>
      <form>
        <h3>Edit</h3>
        <label>
          Title:
          <input
            type="text"
            name="description"
            //   value={newBook.author}
            //   onChange={(event) => {
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            //   value={newBook.author}
            //   onChange={(event) => {
          />
        </label>
        <label>
          Deadline:
          <input
            type="text"
            name="description"
            //   value={newBook.author}
            //   onChange={(event) => {
          />
        </label>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default Edit;
