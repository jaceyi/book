import React from 'react';
import {Link} from 'react-router-dom';
import {searchBook} from '../requests';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchState: false,
      searchLists: []
    };
  }

  componentWillMount() {
    this.searchBook('斗破苍穹')
  }

  handelChangeSearchInput({target}) {
    this.setState({
      searchText: target.value
    })
  }

  handleClickSearchButton() {
    const {searchText} = this.state;
    if (searchText) {
      this.setState({
        searchState: true
      });
      this.searchBook(searchText)
    } else {
      alert('请输入内容')
    }
  }

  async searchBook(text) {
    await searchBook(text)
      .then(
        data => {
          console.log(data.books)
          this.setState({
            searchLists: data.books
          })
        }
      )
  }

  render() {
    const {
      searchText,
      searchState,
      searchLists
    } = this.state;

    const {
      handelChangeSearchInput,
      handleClickSearchButton
    } = this;

    return (
      <div className={'index'}>
        <div className={`search__form${searchState ? ' active' : ''}`}>
          <input
            type="text"
            value={searchText}
            onChange={handelChangeSearchInput.bind(this)}
            className={'search__input'}
            placeholder={'请输入搜索内容'}/>
          <button
            className={'search__button'}
            onClick={handleClickSearchButton.bind(this)}>搜索</button>
        </div>
        <div className={`search__list${searchState ? ' active' : ''}`}>
          {
            searchLists.map(item => (
              <Link to={`/book/${item._id}`} key={item._id} className={'search__list_item'}>
                <div className={'search__list_info'}>
                  <div className={'search__list_title'}>
                    <h3>{item.title}</h3>
                    <span className={'search__list_author'}>{item.author}</span>
                  </div>
                  <div className={'search__list_intro'}>{item.shortIntro}</div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Index;
