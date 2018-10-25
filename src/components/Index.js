import React from 'react';
import {Link} from 'react-router-dom';
import {searchBook} from '../requests';
import Loading from './Loading';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      searchText: '',
      searchState: false,
      searchLists: [],
      focusState: false,
      loading: false
    };
  }

  handelChangeSearchInput({target}) {
    const searchText = target.value;
    this.setState({
      searchText
    });

    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.changeSearchParams(searchText), 800)
  }

  handelBlurSearchInput() {
    let searchState = false;
    if (this.state.searchText) {
      searchState = true
    }
    this.setState({
      focusState: false,
      searchState
    })
  }

  handelFocusSearchInput() {
    this.setState({
      focusState: true
    })
  }

  changeSearchParams(searchText) {
    this.searchBook(searchText)
  }

  searchBook(searchText) {
    const {focusState} = this.state;

    let searchState = false;
    let loading = false;
    if (searchText) {
      searchState = true;
      loading = true;
      searchBook(searchText)
        .then(
          data => {
            this.setState({
              searchLists: data.books,
              loading: false
            })
          }
        )
    } else if (focusState) {
      searchState = true;
    }

    this.setState({
      searchState,
      searchText,
      loading
    });
  }

  render() {
    const {
      searchText,
      searchState,
      searchLists,
      loading
    } = this.state;

    const {
      handelChangeSearchInput,
      handelBlurSearchInput,
      handelFocusSearchInput
    } = this;

    return (
      <Loading loading={loading}>
        <div className={'index'}>
          <div className={`search__form${searchState ? ' active' : ''}`}>
            <input
              type="text"
              value={searchText}
              onFocus={handelFocusSearchInput.bind(this)}
              onBlur={handelBlurSearchInput.bind(this)}
              onChange={handelChangeSearchInput.bind(this)}
              className={'search__input'}
              placeholder={'请输入搜索内容'}/>
          </div>
          <ul className={'my__book_list'}>
            <li><Link to={'/book/50bee5172033d09b2f00001b'}>武炼巅峰</Link></li>
            <li><Link to={'/book/59ba0dbb017336e411085a4e'}>元尊</Link></li>
            <li><Link to={'/book/5091fbcf8d834c0f190000cd'}>校花的贴身高手</Link></li>
          </ul>
          <div className={`search__list${searchState ? ' active' : ''}`}>
            {
              searchLists.length ? searchLists.map(item => (
                <Link to={`/book/${item._id}`} key={item._id} className={'search__list_item'}>
                  <div className={'search__list_info'}>
                    <div className={'search__list_title'}>
                      <h3>{item.title}</h3>
                      <span className={'search__list_author'}>{item.author}</span>
                    </div>
                    <div className={'search__list_intro'}>{item.shortIntro}</div>
                  </div>
                </Link>
              )) :
                <div className={'search__list_not'}>
                  暂无内容
                </div>
            }
          </div>
        </div>
      </Loading>
    )
  }
}

export default Index;
