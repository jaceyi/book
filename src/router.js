import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from './components/Index';
import Book from './components/Book';
import Chapter from './components/Chapter';

export default function() {
  const bgUrl = `url(//yijic.com/public/images/bg/${Math.floor(Math.random() * 13 + 1)}.jpg)`;

  return(
    <div className={'container'} style={{backgroundImage: bgUrl}}>
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
