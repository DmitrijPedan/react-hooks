import React, {useState} from "react";
import './styles/App.css';
import useInput from "./hooks/useInput";

function App() {

 const name = useInput('');
 const email = useInput('');

  return (
    <div className="App">
      <input {...name} type="text" placeholder="name"/>
      <input {...email} type="text" placeholder="email"/>
      <button onClick={() => console.log(name.value, email.value)}>Ok</button>
    </div>
  );
}

export default App;
