export type TodoId = number;

export type Todo = {
    id: TodoId;
    text: string;
    completed: boolean;
};

export type ToDos = {
    todos: Todo[];
};

export type ToDoAction = {
    type: string;
    id: TodoId;
    text: string;
    completed: boolean;
};

export type DeleteAction = {
    type: string;
    id: number;
};

export type ToggleAction = {
    type: string;
    id: number;
};

export type ToDosAction = {
    type: string;
    todos: Todo[];
};
