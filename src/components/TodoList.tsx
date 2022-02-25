import React, { createRef } from 'react';
import styled from 'styled-components';

import TodoItem from './TodoItem';
import { Todo } from '../types';

const StyledUl = styled.ul`
padding: 0;
`;

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const uncompletedTodos = todos.filter(todo => todo.completed === false);
  
  const todosRefs = React.useRef([]);
  todosRefs.current = todos.map((_, i) => todosRefs.current[i] ?? createRef());
  
  return (
    <>
      <ul>
        {todos.map((todo: Todo, i) => <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} ref={todosRefs.current[i]} />)}
      </ul><p>
        {uncompletedTodos.length}{' '}
        {uncompletedTodos.length === 1 ? 'item' : 'items'} left
      </p>
    </>
  );
};
export default TodoList;
