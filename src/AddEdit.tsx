import React from 'react';

const AddEdit = () => {
  return (
    <div>
      <form>
        <h3>Add a new book</h3>
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
        <button type="submit">Add new to do</button>
      </form>
    </div>
  );
};

export default AddEdit;
