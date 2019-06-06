import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import Book from './components/Book';

function App() {
  return (
    <div className="container">
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/book/:id" exact component={Book} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App;
