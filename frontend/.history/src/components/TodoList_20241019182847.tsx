// src/components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.ts';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get('/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
