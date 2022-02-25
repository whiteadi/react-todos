import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { ToDos, ToDosAction } from '../types';
import { ADD_TODO, TOGGLE_TODO, LOAD_TODOS, LOAD_ERROR, UPDATE_TODO_TEXT, DELETE_TODO } from './actionTypes';

export type AppThunk = ActionCreator<
    ThunkAction<void, ToDos, null, Action<string>>
  >;

const apiUrl = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_JSON_SERVER : process.env.REACT_APP_JSON_SERVER_LOCAL) || 'http://localhost:3000/todos';

export const addTodo: AppThunk = (text: string) => {
  return async (dispatch: Dispatch) => {
    const newId = Math.random();
    axios.post(apiUrl, {
      id: newId,
      text,
      completed: false,
    }).then(resp => {
      return dispatch({
        type: ADD_TODO,
        id: newId,
        text,
      });
    }).catch(error => {
      console.log(error);
    });
  };
};

export const toggleTodo: AppThunk = (id: number, text: string, completed: boolean) => {
  return async (dispatch: Dispatch) => {
    axios.put(`${apiUrl}/${id}`, {
      completed: !completed,
      text,
    }).then(resp => {
      return dispatch({
        type: TOGGLE_TODO,
        id,
      });
    }).catch(error => {
      console.log(error);
    });
  };
};

export const updateTodo: AppThunk = (id: number, text: string, completed: boolean) => {
  return async (dispatch: Dispatch) => {
    axios.put(`${apiUrl}/${id}`, {
      text,
      completed,
    }).then(resp => {
      return dispatch({
        type: UPDATE_TODO_TEXT,
        id,
        text,
      });
    }).catch(error => {
      console.log(error);
    });
  };
};

export const deleteTodo: AppThunk = (id: number) => {
  return async (dispatch: Dispatch) => {
    axios.delete(`${apiUrl}/${id}`).then(resp => {
      return dispatch({
        type: DELETE_TODO,
        id,
      });
    }).catch(error => {
      console.log(error);
    });
  };
};

export const fetchTodos: ActionCreator<
    ThunkAction<Promise<any>, ToDos, null, ToDosAction>
> = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(apiUrl);
    try {
      return dispatch({
        type: LOAD_TODOS,
        todos: response?.data,
      });
    } catch (e) {
      return dispatch({
        type: LOAD_ERROR,
      });
    }
  };
};

