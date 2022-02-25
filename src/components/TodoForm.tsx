import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { addTodo } from '../redux/actionCreators';

const StyledList = styled.li`
    list-style: none;
    overflow: hidden;
    width: 100%;
    margin-bottom: 10px;
`;

const FormInput = styled.input`
    float: left;
    width: 180px;
    outline: none;
    font-size: 13px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
    margin-bottom: 10px;
`;

const StyledButton = styled.button`
    float: right;
    width: 60px;
    background: CadetBlue;
    color: #FFF;
    border-radius: 3px;
    border: 2px solid palevioletred;
    padding-top: 7px;
    padding-bottom: 7px;
    outline: none;
    cursor: pointer;
`;

const TodoForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.length > 0) {
      dispatch(addTodo(text));
      setText('');
    }
  };    
    
  return (
    <StyledList>
      <form onSubmit={handleSubmit}>
        <FormInput placeholder="Enter new todo" value={text} onChange={(e) => setText(e.target.value)} />
        <StyledButton type="submit">Add it</StyledButton>
      </form>
    </StyledList>
  );
};
export default TodoForm;