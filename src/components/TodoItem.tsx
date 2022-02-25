import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';

import { updateTodo, toggleTodo, deleteTodo } from '../redux/actionCreators';
import { Todo } from '../types';

interface TodoDivProps {
  completed: boolean;
}

const StyledList = styled.li`
    list-style: none;
    overflow: hidden;
    width: 100%;
    margin-bottom: 10px;
`;

const StyledDiv = styled.div<TodoDivProps>`
    float: left;
    cursor: pointer;
    padding-top: 5px;

  ${p =>
    p.completed &&
    css`
			text-decoration: line-through;
			color: Green;
		`};
`;

const StyledButton = styled.button`
    float: right;
    background: FireBrick;
    color: #FFF;
    border-radius: 3px;
    border: 2px solid palevioletred;
    padding: 3px 8px;
    outline: none;
    cursor: pointer;
`;

const TodoItem = React.forwardRef<HTMLDivElement, Todo>(({ id, text, completed }, ref) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const [targetTodo, setTragetTodo] = useState('');
  
  // because we use json-server for updates we need to send also old values :)
  const hangleToggle = () => {
    dispatch(toggleTodo(id, text, completed));
  };

  const handleRemove = () => {
    dispatch(deleteTodo(id));
  };
  
  useEffect(() => {    
    // handle what happens on key press
    const handleKeyPress = (event: KeyboardEvent) => {
      setKey(event.key);
      if (event.key === 'Enter') {
        if ((event?.target as HTMLDivElement).children.length) {
          const targetTodoId = (event?.target as HTMLDivElement).children[0].id;
          setTragetTodo(targetTodoId);
        }
        event.preventDefault();
      }
    };

    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  useEffect(() => {
    // we want to update only the target todo, on Enter
    if (key === 'Enter') {
      if (typeof ref !== 'function' && ref?.current?.innerText && Number(targetTodo) === id) {
        dispatch(updateTodo(id, ref.current.innerText, completed));
      }
    }
  }, [key, targetTodo]);

  return (
    <StyledList>
      <StyledDiv contentEditable={true} ref={ref} completed={completed}>
        <input type="checkbox" key={id} id={id.toString()} checked={completed} onChange={hangleToggle} /> {text}
      </StyledDiv>
      <StyledButton type="button" onClick={handleRemove}>Delete todo</StyledButton>
    </StyledList>
  );
});

export default TodoItem;
