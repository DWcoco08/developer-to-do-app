import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
      },
    ]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleEdit = (id) => {
    if (!editValue.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editValue } : todo
      )
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card tech-card">
            <div className="card-body">
              <h1 className="text-center mb-4">DEV Todo List</h1>

              <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control tech-input"
                    placeholder="Add a new task..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <FaPlus />
                  </button>
                </div>
              </form>

              <div className="todo-list">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`todo-item ${todo.completed ? "completed" : ""}`}
                  >
                    {editId === todo.id ? (
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control tech-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleEdit(todo.id);
                            } else if (e.key === "Escape") {
                              setEditId(null);
                              setEditValue("");
                            }
                          }}
                          autoFocus
                        />
                        <button
                          className="btn btn-success"
                          onClick={() => handleEdit(todo.id)}
                          title="Save (or press Enter)"
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setEditId(null);
                            setEditValue("");
                          }}
                          title="Cancel (or press Esc)"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input me-3"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                          />
                          <span className="todo-text">{todo.text}</span>
                        </div>
                        <div className="todo-actions">
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => startEdit(todo.id, todo.text)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
