import React from 'react';
import {getChapter} from '../requests';
import {Link} from 'react-router-dom';
import content from '../content';

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: '',
      content: '',
      currentChapterLink: '',
      prevChapterLink: '/',
      nextChapterLink: '/'
    };
  }

  componentWillMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps)
  }

  init(props) {
    const {chapterList, match} = props;
    const {link: chapterLink, id: bookId} = match.params;
    const currentChapterLink = decodeURIComponent(chapterLink);
    const currentIndex = chapterList.findIndex(item => item.link === currentChapterLink);

    if (currentIndex >= 0) {
      let nextChapterLink = '';
      let prevChapterLink = '';

      switch (currentIndex) {
        case 0:
          nextChapterLink = chapterList[currentIndex + 1].link;
          break;
        case chapterList.length - 1:
          prevChapterLink = chapterList[currentIndex - 1].link;
          break;
        default:
          prevChapterLink = chapterList[currentIndex - 1].link;
          nextChapterLink = chapterList[currentIndex + 1].link;
      }

      this.setState({
        bookId,
        nextChapterLink,
        prevChapterLink,
        currentChapterLink
      });
    }

    this.getChapter(chapterLink);
  }

  async getChapter(link) {
    await getChapter(link)
      .then(
        data => {
          const {chapter} = data;
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
            content
          })
        }
      )
  }

  render() {
    const {
      bookId,
      content,
      prevChapterLink,
      nextChapterLink
    } = this.state;

    return (
      <div className={'chapter'}>
        <div className={'chapter__content'}>
          <pre className={'chapter__per'}>
            {
              content
            }
          </pre>
        </div>
        <div className={'chapter__ctrl'}>
          <Link to={`/book/${bookId}/chapter/${encodeURIComponent(prevChapterLink)}`}>上一章</Link>
          <Link to={`/book/${bookId}`}>返回列表</Link>
          <Link to={`/book/${bookId}/chapter/${encodeURIComponent(nextChapterLink)}`}>下一章</Link>
        </div>
      </div>
    )
  }
}

export default content(Chapter);
