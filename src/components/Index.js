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
      loading: false
    };
  }

  componentWillMount() {
    const searchText = this.props.match.params.text;
    if (searchText) {
      this.changeSearchParams(searchText);
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

  changeSearchParams(searchText) {
    this.props.history.push(`/search/${searchText}`);
    this.searchBook(searchText)
  }

  searchBook(searchText) {
    let searchState = false;
    if (searchText) {
      searchState = true;
      searchBook(searchText)
        .then(
          data => {
            this.setState({
              searchLists: data.books,
              loading: false
            })
          }
        )
    } else {
      this.props.history.push('/');
    }

    this.setState({
      searchState,
      searchText,
      loading: searchState
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
      handelChangeSearchInput
    } = this;

    return (
      <Loading loading={loading}>
        <div className={'index'}>
          <div className={`search__form${searchState ? ' active' : ''}`}>
            <input
              type="text"
              value={searchText}
              onChange={handelChangeSearchInput.bind(this)}
              className={'search__input'}
              placeholder={'请输入搜索内容'}/>
          </div>
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
