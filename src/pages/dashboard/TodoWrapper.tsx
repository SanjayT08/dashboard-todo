import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import './Dashboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  subTasks: TodoItem[];
}

export const TodoWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (todo: string) => {
    const newTodo: TodoItem = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
      subTasks: [],
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  console.log(todos)
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task: string, id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const addSubTask = (task: string, parentId: string) => {
    const newSubTask: TodoItem = {
      id: uuidv4(),
      task,
      completed: false,
      isEditing: false,
      subTasks: [],
    };

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === parentId
          ? { ...todo, subTasks: [...todo.subTasks, newSubTask] }
          : todo
      )
    );
  };

  const deleteSubTask = (parentId: string, subTaskId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === parentId
          ? {
              ...todo,
              subTasks: todo.subTasks.filter(
                (subTask) => subTask.id !== subTaskId
              ),
            }
          : todo
      )
    );
  };


  


  return (
    <div className="TodoWrapper">
      <h1>Todo Dashboard</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) => (
        <div key={todo.id} className="Todo">
          <p
            className={`${todo.completed ? "completed" : ""}`}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.task}
          </p>
          <div>
            <FontAwesomeIcon
              icon={faPenSquare}
              onClick={() => editTodo(todo.id)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
          {/* form to add sub task */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const subTaskInput = (e.target as HTMLFormElement).elements.namedItem(
                "subTask"
              ) as HTMLInputElement;
              if (subTaskInput) {
                addSubTask(subTaskInput.value, todo.id);
                subTaskInput.value = "";
              }
            }}
            className="SubTaskForm"
          >
            <input
              type="text"
              name="subTask"
              className="sub-task-input"
              placeholder="Add sub task"
            />
            <button type="submit" className="sub-task-btn">
              Add Sub Task
            </button>
          </form>
          {/* display sub tasks */}
          <div className="subTask">
          {todo.subTasks.map((subTask) => (
            <div key={subTask.id} className="SubTask">
              <p
                className={`${subTask.completed ? "completed" : ""}`}
                onClick={() => toggleComplete(subTask.id)}
              >
                {subTask.task}
              </p>
              <div>
                
                <FontAwesomeIcon
                  icon={faPenSquare}
                  onClick={() => editTodo(subTask.id)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteSubTask(todo.id, subTask.id)}
                />
               
              </div>
            </div>
          ))}
           </div>
        </div>
      ))}
      
    </div>
  );
};