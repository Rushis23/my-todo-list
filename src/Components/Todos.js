function ToDos({ todos, setTodos, setInput }) {

  function handleEdit(inputVal, id) {
    handleDelete(id);
    setInput(inputVal);
  }

  function handleDelete(id) {
    const updatedTodos = todos.filter(
      item => item.id !== id
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  const handleCheckboxChange = (e, id) => {
    const updatedTodos = todos.map(item => {
      if (item.id === id) {

        return {
          ...item, isCompleted: !item.isCompleted
        };
      }
      return item;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="container">
      {
        todos.map(
          item => {
            return (
              <>
                <div
                  key={item.id}
                  className="todo"
                  style={
                    item.isCompleted ?
                      { backgroundColor: "#16d216" } : {}
                  }
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onClick={(e) => handleCheckboxChange(e, item.id)}
                    />
                    <span
                      className="task"
                    >
                      {item.task}
                    </span>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={() => handleEdit(item.task, item.id)}
                      className="btn-edit fa-solid fa-pen-to-square"
                    />
                    <button
                      type="submit"
                      onClick={() => handleDelete(item.id)}
                      className="btn-del fa-solid fa-trash"
                    />
                  </div>
                </div>
              </>
            )
          }
        )
      }
    </div>
  );
}

export default ToDos;