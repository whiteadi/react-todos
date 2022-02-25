import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { fetchTodos } from './redux/actionCreators';
import { useTypedSelector } from './hooks/useTypeSelector';

const Container = styled.div`
width: 250px;
margin: 10px auto;
font-family: Arial, Helvetica, sans-serif;
font-size: 13px;
`;

const App = () => {
  const dispatch = useDispatch();
  const { todos } = useTypedSelector((state) => state.todos);
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <Container>
      <TodoForm />
      <TodoList todos={todos} />
    </Container>
  );
};
export default App;
