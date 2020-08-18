// App.js - Frontend
// Asennettaan otetaan käyttöön React-router-dom sekä Bootstrap-tyylit.
// Otetaan ToDo-komponentit käyttöön sekä rakennetaan 
// sovelluksen perusreitiys. 

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo";
import EditTodo from "./components/edit-todo";
import TodosList from "./components/list-todo";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://riveria.fi" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="Ultimaattinen Riveria-amis" />
            </a>
            <Link to="/" className="navbar-brand">ToDo-Sovellus</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Tehtävät</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Luo tehtävä</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;



// Terminals 3 pcs
// C:\Program` Files\MongoDB\Server\4.4\bin\mongod.exe --dbpath C:\Users\20109055\data
// cd backend\server.js -> node server.js
// npm start app.js