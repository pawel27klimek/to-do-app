import { FiEdit3, FiTrash2 } from 'react-icons/fi';

const Todo = () => {
  return (
    <div style={{ border: 'solid black' }}>
      <h1>Title: Lorem, ipsum.</h1>
      <FiEdit3 />
      <FiTrash2 />
      {/* <div>
        <h3>Description:</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, minus!
        </p>
      </div> */}
    </div>
  );
};

export default Todo;
