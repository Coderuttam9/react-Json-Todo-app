import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Todos.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({
    todo: "",
  });

  const [inFelt, setInFelt] = useState(false);
  const [upInput, setUpInput] = useState({});

  // set input value
  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // set form value
  const handleFormSubmit = async () => {
    await axios.post("http://localhost:7000/todos", input);
    setInput({ todo: "" });
    handleValueGet();
  };

  // Get data from API
  const handleValueGet = async () => {
    const response = await axios.get("http://localhost:7000/todos");
    setTodos(response.data);
  };

  useEffect(() => {
    handleValueGet();
  }, []);

  // delete data from API
  const handleDeleteData = async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`);
    handleValueGet();
  };

  // toggle handlers
  const handleChangeFields = async (id) => {
    const updateData = todos.find((data) => data.id === id);
    setUpInput(updateData);
    setInFelt(true);
  };

  // upInput state handlers
  const handleUpdateInput = (e) => {
    setUpInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // update form submit
  const handleUpdateFormSubmit = async () => {
    await axios.put(`http://localhost:7000/todos/${upInput.id}`, upInput);
    setInFelt(false);
    handleValueGet();
  };

  return (
    <div className="container">
      <div className="row mt-3 justify-content-between">
        <div className="col-md-2"></div>
        <div className="col md-8 text-center ">
          <div className="todo-content ">
            <div className="todo-header">
              <h2 className="pt-3">Todo App</h2>
              <hr />
            </div>
            <div className="form-section">
              {!inFelt ? (
                <div className="form-content">
                  <input
                    name="todo"
                    onChange={handleInput}
                    value={input.todo}
                    type="text"
                    placeholder="Add daily todo"
                  />
                  <button type="submit" onClick={handleFormSubmit}>
                    Add Todo
                  </button>
                </div>
              ) : (
                <div className="form-content">
                  <input
                    name="todo"
                    onChange={handleUpdateInput}
                    value={upInput.todo}
                    type="text"
                    placeholder="Update daily todo"
                  />
                  <button type="submit" onClick={handleUpdateFormSubmit}>
                    Update Todo
                  </button>
                </div>
              )}
            </div>
            <div className="todo-list">
              <ul className="pt-4">
                {todos?.map((item) => (
                  <li key={item.id}>
                    <p>{item.todo}</p>
                    <span>
                      <span
                        className="text-primary"
                        onClick={() => handleChangeFields(item.id)}
                      >
                        <FiEdit />
                      </span>
                      <span
                        className="text-danger"
                        onClick={() => handleDeleteData(item.id)}
                      >
                        <FaRegTrashAlt />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default Todo;
