import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from 'redux/actions/allActions';

const Counter: React.FC = () => {
  const count = useSelector((state: any) => state.example.value); //durumdan değeri çekiyorum
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>increment</button>{' '}
      {/* Sayaç Arttır */}
      <button onClick={() => dispatch(decrement())}>decrement</button>{' '}
      {/* sayaç azalt */}
    </div>
  );
};

export default Counter;