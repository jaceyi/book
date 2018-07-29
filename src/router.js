import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from './components/Index';
import Book from './components/Book';
import Chapter from './components/Chapter';

export default function() {
  return(
    <div className={'container'}>
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Index}/>
          <Route path={'/book/:id'} exact component={Book}/>
          <Route path={'/chapter/:link'} exact component={Chapter}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
