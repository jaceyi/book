import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from './components/Index';
import Book from './components/Book';
import Chapter from './components/Chapter';

export default function() {
  const bgUrl = `url(//yijic.com/static/images/bg_${Math.floor(Math.random() * 3 + 1)}.jpg)`;

  return(
    <div className={'container'}>
      <div className={'container__bg'} style={{backgroundImage: bgUrl}}/>
      <div className={'container__main'}>
        <HashRouter>
          <Switch>
            <Route path={'/'} exact component={Index}/>
            <Route path={'/book/:id'} exact component={Book}/>
            <Route path={'/book/:id/chapter/:link'} exact component={Chapter}/>
          </Switch>
        </HashRouter>
      </div>
    </div>
  )
}
