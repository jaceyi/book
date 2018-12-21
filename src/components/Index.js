import React from 'react';
import {Link} from 'react-router-dom';
import {searchBook} from '../requests';
import Loading from './Loading';
import {formatSearchParams} from '../util';

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

  componentWillMount() {
    const searchParams = formatSearchParams(this.props.location.search);
    if (searchParams) {
      const searchText = decodeURI(searchParams.searchText);
      this.setState({
        searchText: searchText,
        searchState: true
      });
      this.searchBook(searchText)
    }
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
    this.props.history.push(`/?searchText=${searchText}`);
    this.searchBook(searchText);
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
      this.props.history.push('/');
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

    return (
      <Loading loading={loading}>
        <div className={'index'}>
          <div className={`search__form${searchState ? ' active' : ''}`}>
            <input
              type="text"
              value={searchText || ''}
              onFocus={() => this.handelFocusSearchInput()}
              onBlur={() => this.handelBlurSearchInput()}
              onChange={v => this.handelChangeSearchInput(v)}
              className={'search__input'}
              placeholder={'请输入搜索内容'}/>
          </div>
          <ul className={`my__book_list${searchState ? ' active' : ''}`}>
            <li><Link to={'/book/59ba0dbb017336e411085a4e'}>元尊</Link></li>
            <li><Link to={'/book/5a5577e59b2420ef3fda94f2'}>落地一把98K</Link></li>
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
