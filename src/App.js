import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import Book from './components/Book';
import Chapter from './components/Chapter';
import { getBackground } from './requests'

class App extends Component {
  state = {
    imgSrc: ''
  }

  async componentWillMount() {
    const images = await getBackground();
    let imgSrc = 'https://yijic.com/static/images/bg_main.jpg';
    if (images && images.length) {
      imgSrc = 'https://cn.bing.com/' + images[0].url
    }
    this.setState({
      imgSrc
    })
  }

  render() {
    const { imgSrc } = this.state;

    return(
      <div className={'container'}>
        <div className={'container__bg'} style={{backgroundImage: `url(${imgSrc})`}}/>
        <div className={'container__main'}>
          <BrowserRouter>
            <Switch>
              <Route path={'/'} exact component={Index}/>
              <Route path={'/book/:id'} exact component={Book}/>
              <Route path={'/book/:id/chapter/:link'} exact component={Chapter}/>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default App;
