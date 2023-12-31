import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import "./Todos.css";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState({
    todo: "",
  });
  const [inFelt, setInFilt] = useState(false);

  //set input value
  const handleInputchange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //set form value
  const handleFormsubmit = async () => {
    if (!input.todo) {
      toast.error("Please Input value first");
    } else {
      await axios.post("http://localhost:7000/todos", input);
      setInput({ todo: "" }); // Change this line
      handleValueget();
      toast.success("Todo Add successfully");
    }
  };

  //Get data from api
  const handleValueget = async () => {
    const response = await axios.get("http://localhost:7000/todos");
    setTodo(response.data);
  };
  useEffect(() => {
    handleValueget();
  }, []);

  // delete data from api
  const handledelteData = async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`);
    handleValueget();
  };

  //toogle handlers
  const handleChangeFilds = (id) => {
    setInput(todo.find((data) => data.id === id));
    setInFilt(true);
  };

  // udpdate form submit
  const handleUpdateFormsubmit = async () => {
    if (!input.todo) {
      toast.error("Todo Add successfully");
    } else {
      await axios.patch(`http://localhost:7000/todos/${input.id}`, input);
      setInFilt(false);
      handleValueget();
      setInput({ todo: "" });
      toast.success("Todo Update successfully");
    }
  };
  return (
    <div className="container">
      <div className="row  mt-3 justify-content-between ">
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
                    onChange={handleInputchange}
                    value={input.todo}
                    type="text"
                    placeholder="Add daily todo"
                  />
                  <button type="submit" onClick={handleFormsubmit}>
                    Add Todo
                  </button>
                </div>
              ) : (
                <div className="form-content">
                  <input
                    name="todo"
                    onChange={handleInputchange}
                    value={input.todo}
                    type="text"
                    placeholder="Add daily todo"
                  />
                  <button type="submit" onClick={handleUpdateFormsubmit}>
                    update Todo
                  </button>
                </div>
              )}
            </div>
            <div className="todo-list">
              <ul className="pt-4">
                {todo?.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>{item.todo}</p>
                      <span>
                        <span
                          className="text-primary"
                          onClick={() => handleChangeFilds(item.id)}
                        >
                          <FiEdit />
                        </span>
                        <span
                          className=" text-danger "
                          onClick={() => handledelteData(item.id)}
                        >
                          <FaRegTrashAlt />
                        </span>
                      </span>
                    </li>
                  );
                })}
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
