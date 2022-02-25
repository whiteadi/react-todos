import { ADD_TODO, TOGGLE_TODO, UPDATE_TODO_TEXT, DELETE_TODO, LOAD_TODOS, LOAD_ERROR } from '../actionTypes';
import { ToDoAction, ToDosAction, ToDos, Todo, DeleteAction, ToggleAction } from '../../types';
import { initialState } from './';

type Action = ToDoAction | ToDosAction | DeleteAction | ToggleAction;

export default function (state: ToDos = initialState, action: Action): ToDos {
  switch (action.type) {
  case ADD_TODO: {
    const newTodo: Todo = {
      id: (action as ToDoAction).id,
      text: (action as ToDoAction).text,
      completed: false,
    };
    return {
      ...state,
      todos: state.todos.concat(newTodo),
    };
  }
  case TOGGLE_TODO: {
    const { id } = (action as ToggleAction);
    return {
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = {
            ...todo,
            completed: !todo.completed,
          };
          return updatedTodo;
        } else {
          return todo;
        }
      }),
    };
  }
  case UPDATE_TODO_TEXT: {
    const { id, text } = (action as ToDoAction);
    return {
      todos: state.todos.map((todo) => ((todo.id === id)
        ? { ...todo, text }
        : todo)),
    };
  }
  case DELETE_TODO: {
    const { id } = (action as DeleteAction);
    return {
      todos: state.todos.filter((todo) => todo.id !== id),
    };
  }
  case LOAD_TODOS: {
    return { todos: (action as ToDosAction).todos };
  }
  case LOAD_ERROR: {
    return { todos: [] };
  }
  default:
    return state;
  }
}
