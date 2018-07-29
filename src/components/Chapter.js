import React from 'react';
import {getChapter} from '../requests';
import {Link} from 'react-router-dom';

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  componentWillMount() {
    const chapterLink = this.props.match.params.link;
    console.log(chapterLink);
    this.getChapter(chapterLink)
  }

  async getChapter(link) {
    await getChapter(link)
      .then(
        data => {
          console.log(data);
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
      content
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
          <Link to={'/'}>上一章</Link>
          <Link to={'/'}>下一章</Link>
        </div>
      </div>
    )
  }
}

export default Chapter;
