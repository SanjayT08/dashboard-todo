import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  children: Todo[];
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string, parentId?: number) => void;
}

// const TodoContext = createContext<TodoContextProps | undefined>(undefined);
const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
});

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string, parentId?: number) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
      children: [],
    };


    if (parentId !== undefined) {
      const parentTodo = findTodoById(todos, parentId);
      if (parentTodo) {
        parentTodo.children.push(newTodo);
        setTodos([...todos]);
        return;
      }
    }

    setTodos([...todos, newTodo]);
  };

  const findTodoById = (todos: Todo[], id: number): Todo | undefined => {
    for (const todo of todos) {
      if (todo.id === id) {
        return todo;
      }
      const childTodo = findTodoById(todo.children, id);
      if (childTodo) {
        return childTodo;
      }
    }
    return undefined;
  };

  const todoContextValue: TodoContextProps = {
    todos,
    addTodo,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};
