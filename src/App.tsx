import React from 'react';
import { NavBar } from './components/nav-bar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { TodoWrapper } from './components/todo-component';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/todos'>
            <TodoWrapper />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
