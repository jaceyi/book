import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from './components/Index';
import Book from './components/Book';
import Chapter from './components/Chapter';

export default function() {
  return(
    <div className={'container'}>
      <HashRouter>
        <Switch>
          <Route path={'/'} exact component={Index}/>
          <Route path={'/book/:id'} exact component={Book}/>
          <Route path={'/book/:id/chapter/:link'} exact component={Chapter}/>
        </Switch>
      </HashRouter>
    </div>
  )
}
