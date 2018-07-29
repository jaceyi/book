import React from 'react';
import {Link} from 'react-router-dom';
import {getBook, getBookOrigin, getChapterList} from '../requests';
import {realBookCover, dateToStr} from '../util';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookInfo: {},
      chapterList: [],
      order: true
    };
  }

  componentWillMount() {
    const bookId = this.props.match.params.id;
    this.getBook(bookId);
    this.getBookOrigin(bookId);
  }

  async getBook(id) {
    await getBook(id)
      .then(
        data => {
          this.setState({
            bookInfo: data
          })
        }
      )
  }

  async getBookOrigin(id) {
    await getBookOrigin(id)
      .then(
        data => {
          let index = data.findIndex(item => item.source === 'my176');
          if (index < 0) {
            index = 0
          }
          this.getChapterList(data[index]._id)
        }
      )
  }

  async getChapterList(id) {
    await getChapterList(id)
      .then(
        data => {
          this.setState({
            chapterList: data.chapters
          });
        }
      )
  }

  handleClickReverse() {
    const {
      chapterList,
      order
    } = this.state;

    this.setState({
      order: !order,
      chapterList: chapterList.reverse()
    })
  }

  render() {
    const {
      bookInfo,
      chapterList
    } = this.state;

    const {
      handleClickReverse
    } = this;

    const date = new Date(bookInfo.updated);

    return (
      <div className={'book'}>
        {
          bookInfo._id && <div>
            <div className={'book__info'}>
              <div className={'book__info_top'}>
                <div className={'book__info_img'}>
                  <img src={realBookCover(bookInfo.cover)} alt=""/>
                </div>
                <div className={'book__info_text'}>
                  <h3>{bookInfo.title}</h3>
                  <p>作者：{bookInfo.author}</p>
                  <p>类型：{bookInfo.majorCate}</p>
                  <p>更新时间：{dateToStr(date)}</p>
                </div>
              </div>
              <div className={'book__info_bottom'}>{bookInfo.longIntro}</div>
            </div>
            <div className={'book__chapter_tip'}>
              <span>章节列表</span>
              <button className={'book__chapter_reverse'} onClick={handleClickReverse.bind(this)}>Reverse</button>
            </div>
            <div className={'book__chapter_list'}>
              {
                chapterList.map(item => (
                  <div key={item.link} className={'book__chapter_item'}>
                    <Link to={`/chapter/${encodeURIComponent(item.link)}`}>
                      {
                        item.title
                      }
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Book;
