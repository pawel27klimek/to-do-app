import Todo from './Todo';
import { FiPlusSquare } from 'react-icons/fi';

const List = () => {
  return (
    <div>
      <FiPlusSquare />
      <div>
        Lista:
        <Todo />
      </div>
    </div>
  );
};

export default List;
