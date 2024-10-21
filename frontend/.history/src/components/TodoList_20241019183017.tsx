import React, { useEffect, useState } from 'react';
import api from '../services/api.ts';

interface Todo {
  _id: string;
  title: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api.get('/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
