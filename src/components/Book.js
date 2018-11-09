import React from 'react';
import {Link} from 'react-router-dom';
import {realBookCover, dateToStr, getChapterLink} from '../util';
import content from '../content';
import Loading from './Loading';

function Book(props) {
  const {
    bookInfo,
    chapterList,
    reverseChapterList,
    loading
  } = props;

  window.scrollTo(0, 0);
  document.title = `yi家书屋 — ${bookInfo.title}`;
  
  const date = new Date(bookInfo.updated);
  let lastChapter = {
    title: '暂无',
    link: '/'
  };

  if (chapterList.length) {
    const firstChapter = chapterList[0];
    if (firstChapter.title === bookInfo.lastChapter) {
      lastChapter = firstChapter
    } else {
      lastChapter = chapterList[chapterList.length - 1]
    }
  }

  return (
    <Loading loading={loading}>
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
                  <p>最新章节：<Link to={getChapterLink(lastChapter.link, bookInfo._id)}>{lastChapter.title}</Link></p>
                </div>
              </div>
              <div className={'book__info_bottom'}>{bookInfo.longIntro}</div>
              <div className={'book__home_button'}>
                <Link to={'/'}><img src="//yijic.com/public/images/yi.png" alt=""/></Link>
              </div>
            </div>
            <div className={'book__chapter_tip'}>
              <span>章节列表</span>
              <button className={'book__chapter_reverse'} onClick={reverseChapterList}>Reverse</button>
            </div>
            <div className={'book__chapter_list'}>
              {
                chapterList.map(item => (
                  <div key={item.link} className={'book__chapter_item'}>
                    <Link to={getChapterLink(item.link, bookInfo._id)}>
                      {
                        item.title
                      }
                    </Link>
                  </div>
                ))
              }
              <div className={'book__chapter_footer'}>到底啦！</div>
            </div>
          </div>
        }
      </div>
    </Loading>
  )
}

export default content(Book);
