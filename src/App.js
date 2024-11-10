import './App.css';
import { useState, useEffect } from 'react';
import ToDos from './Components/Todos.js';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const today = new Date().toDateString();

    if (storedTodos && storedTodos.length) {
      const parsedTodos = JSON.parse(storedTodos);
      const lastStoredDate = (parsedTodos.length)? new Date(parsedTodos[0].date).toDateString() : null;
      if (today === lastStoredDate) {
        setTodos(parsedTodos);
      } else {
        localStorage.clear();
      }
    }
  }, []);

  function handleChange(e) {
    let { value } = e.target;
    setInput(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.length) {
      const newTodo = {
        id: Date.now(),
        task: input,
        date: new Date().toDateString(),
        isCompleted: false
      };
      setTodos([...todos, newTodo]);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    }
    setInput('');
  }

  return (
    <>
      <div className="App">
        {console.log(localStorage.getItem('todos'))}
        <div className="App_name">My ToDo List</div>
        <div>
          <div class="input-container">
            <input
              type="text"
              className="input"
              placeholder="Enter Today's Task"
              value={input}
              onChange={(e) => handleChange(e)}
              autoComplete='off'
            />
            <button
              type="submit"
              className="input-button"
              onClick={handleSubmit}
            >
              {/* Arrow Right Icon is added from Font Awesome */}
              <i class="fa-solid fa-arrow-right" ></i>
            </button>
          </div>
        </div>
        {/* Call to Component - ToDos */}
        <ToDos
          todos={todos}
          setTodos={setTodos}
          setInput={setInput}
        />
      </div>
    </>
  );
}

export default App;
