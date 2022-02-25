import { combineReducers } from 'redux';
import todos from './todos';
import { ToDos } from '../../types';

export const initialState: ToDos = { todos: [] };

export default combineReducers({ todos });

export type RootState = ReturnType<typeof todos>;
