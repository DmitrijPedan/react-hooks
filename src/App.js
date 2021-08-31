import React, {useState, useRef, useEffect} from "react";
import './styles/App.css';
import useInput from "./hooks/useInput";
import useHover from "./hooks/useHover";
import useDebounce from "./hooks/useDebounce";
import useRequest from "./hooks/useRequest";
import axios from "axios";

function App() {

  // useInput
  const name = useInput('');
  const email = useInput('');

  // useHover
  const div = useRef();
  const divHover = useHover(div);
  const div2 = useRef();
  const div2Hover = useHover(div2);

  // useDebounce (search)
  const [value, setValue] = useState([]);
  const [todos, setTodos] = useState([]);
  const search = (query) => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10&_query=${query}`)
      .then(response => response.json())
      .then(json => setTodos(json))
  }
  const debouncedSearch = useDebounce(search, 500)
  const queryChange = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value)
  }

  //useRequest (handling loading and errors)
  const fetchTodos = () => {
    return axios(`https://jsonplaceholder.typicode.com/todos?_limit=3`);
  }
  const [exampleTodos, loading, error] = useRequest(fetchTodos)


  return (
    <div className="App">

      <div className="block">
        <h3>useInput</h3>
        <div className="wrapper row">
          <input {...name} type="text" placeholder="name"/>
          <input {...email} type="text" placeholder="email"/>
          <button onClick={() => console.log(name.value, email.value)}>Ok</button>
        </div>
      </div>

      <div className="block">
        <h3>useHover</h3>
        <div className="wrapper row">
          <div ref={div} style={{width: 150, height: 150, cursor: 'pointer', backgroundColor: divHover ? 'red' : 'green'}}/>
          <div ref={div2} style={{width: 150, height: 150, cursor: 'pointer', backgroundColor: div2Hover ? 'red' : 'green'}}/>
        </div>
      </div>

      <div className="block">
        <h3>useDebounce</h3>
        <input value={value} onChange={queryChange} type="text" placeholder="search ..." />
        <div className="wrapper column">
          {todos.map(todo =>
            <div key={todo.id} style={{padding: 15, border: '1px solid green'}}>
              <span>{todo.title}</span>
            </div>
          )}
        </div>
      </div>

      <div className="block">
        <h3>useRequest</h3>
        <div className="wrapper column">
          {loading && <p style={{color: 'orange'}}>Loading ...</p>}
          {error && <p style={{color: 'red'}}>Error {error.message}</p>}
          {exampleTodos.map(todo =>
            <div key={todo.id} style={{padding: 15, border: '1px solid green'}}>
              <span>{todo.title}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
