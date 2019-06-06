import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {realBookCover, dateToStr} from '../util';
import connect from '../connect';
import Loading from './Loading';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentList: [],
      optionList: [],
      lastChapter: [],
      updateTime: new Date()
    }
  }

  componentDidMount() {
    this.componentInit(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.componentInit(nextProps)
  }

  componentInit({bookInfo, chapterList, order}) {
    window.scrollTo(0, 0);
    document.title = `yi家书屋 — ${bookInfo.title || ''}`;
    let optionList = [];
    let lastChapter = {
      title: '暂无',
      link: '/'
    };
    if (chapterList.length) {
      lastChapter = order ? chapterList[chapterList.length - 1] : chapterList[0];
      for (let page = 1; page <= Math.ceil(chapterList.length / 50); page ++) {
        let _default = false;
        if (page === this.state.currentPage) _default = true;
        optionList.push({
          default: _default,
          label: `第${page}页：${chapterList[(page - 1) * 50].title.slice(0, 6)}…`
        })
      }
    }
    this.setState({
      lastChapter,
      updateTime: new Date(bookInfo.updated),
      optionList
    }, () => this.getCurrentList());
  }

  getCurrentList(page = this.state.currentPage) {
    if (this.state.optionList.length && (page <= 0 || page > this.state.optionList.length)) {
      return alert('木有了！')
    }
    this.setState({
      currentPage: page,
      currentList: this.props.chapterList.slice((page - 1) * 50, page * 50)
    })
  }

  handleChangeSelelct(e) {
    this.getCurrentList(e.target.selectedIndex + 1)
  }

  render() {
    const {
      bookInfo,
      reverseChapterList,
      loading
    } = this.props;
    const {
      currentList,
      optionList,
      lastChapter,
      updateTime,
      currentPage
    } = this.state;

    return (
      <Loading loading={loading}>
        <div className="book">
          {
            bookInfo._id && <div>
              <div className="book__info">
                <div className="book__info_top">
                  <div className="book__info_img">
                    <img src={realBookCover(bookInfo.cover)} alt=""/>
                  </div>
                  <div className="book__info_text">
                    <h3>{bookInfo.title}</h3>
                    <p>作者：{bookInfo.author}</p>
                    <p>类型：{bookInfo.majorCate}</p>
                    <p>更新时间：{dateToStr(updateTime)}</p>
                    <p>最新章节：{lastChapter.title}</p>
                  </div>
                </div>
                <div className="book__info_bottom">{bookInfo.longIntro}</div>
                <div className="book__home_button">
                  <Link to={'/'}><img src="//yijic.com/static/images/yi.png" alt=""/></Link>
                </div>
              </div>
              <div className="book__chapter_tip">
                <span>章节列表</span>
                <button className="book__chapter_btn" onClick={reverseChapterList}>Reverse</button>
              </div>
              <div className="book__chapter_list">
                {
                  currentList.map(item => (
                    <div key={item.link} className="book__chapter_item">
                      {item.title}
                    </div>
                  ))
                }
                <div className="book__chapter_footer">
                  <button
                    className="book__chapter_btn"
                    onClick={() => this.getCurrentList(currentPage-1)}>上一页</button>
                  <select
                    onChange={v => this.handleChangeSelelct(v)}
                    className="book__chapter_btn book__chapter_select"
                  >
                    {
                      optionList.map((item, index) => (
                        <option key={index} defaultChecked={item.default}>{item.label}</option>
                      ))
                    }
                  </select>
                  <button
                    className="book__chapter_btn"
                    onClick={() => this.getCurrentList(currentPage+1)}>下一页</button>
                </div>
              </div>
            </div>
          }
        </div>
      </Loading>
    )
  }
}

export default connect(Book);
