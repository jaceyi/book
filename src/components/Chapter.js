import React from 'react';
import {getChapter} from '../requests';
import {Link} from 'react-router-dom';
import content from '../content';
import {getChapterLink} from '../util';
import Loading from './Loading';

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: '',
      content: '',
      currentChapterLink: '',
      prevChapterLink: '/',
      nextChapterLink: '/',
      loading: false
    };
  }

  componentWillMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps)
  }

  init(props) {
    window.scrollTo(0, 0);

    const {chapterList, match, order} = props;
    const {link: chapterLink, id: bookId} = match.params;
    const currentChapterLink = decodeURIComponent(chapterLink);
    const currentIndex = chapterList.findIndex(item => item.link === currentChapterLink);

    if (currentIndex >= 0) {
      const prenIndex = order ? currentIndex - 1 : currentIndex + 1;
      const nextIndex = order ? currentIndex + 1 : currentIndex - 1;
      const prevChapter = chapterList[prenIndex];
      const nextChapter = chapterList[nextIndex];
      const nextChapterLink = nextChapter ? nextChapter.link : '';
      const prevChapterLink = prevChapter ? prevChapter.link : '';

      this.setState({
        bookId,
        nextChapterLink,
        prevChapterLink,
        currentChapterLink,
        loading: true
      });
    }

    this.getChapter(chapterLink);
  }

  getChapter(link) {
    getChapter(link)
      .then(
        data => {
          const {chapter} = data;
          document.title = chapter.title;
          let content = '';
          if (chapter.cpContent) {
            content = chapter.cpContent
          } else if (chapter.body) {
            content = chapter.body;
            content = '   ' + content.replace(/\n/g, "\n   ")
          } else {
            content = '加载失败'
          }

          this.setState({
            content,
            loading: false
          })
        }
      )
  }

  render() {
    const {
      bookId,
      content,
      prevChapterLink,
      nextChapterLink,
      loading
    } = this.state;

    const _prevChapterLink = getChapterLink(prevChapterLink, bookId);
    const _nextChapterLink = getChapterLink(nextChapterLink, bookId);

    return (
      <Loading loading={loading}>
        <div className={'chapter'} ref={e => {
          this.chapterEle = e
        }}>
          <div className={'chapter__content'}>
          <pre className={'chapter__per'}>
            {
              content
            }
          </pre>
          </div>
          <div className={'chapter__ctrl'}>
            <Link to={_prevChapterLink}>上一章</Link>
            <Link to={`/book/${bookId}`}>返回列表</Link>
            <Link to={_nextChapterLink}>下一章</Link>
          </div>
        </div>
      </Loading>
    )
  }
}

export default content(Chapter);
