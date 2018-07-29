import React from 'react';
import {getBookOrigin, getChapterList} from "./requests";

const store = {
  chapterList: []
};

export default function content(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        chapterList: []
      };
    }

    componentWillMount() {
      const bookId = this.props.match.params.id;
      if (store.chapterList.length) {
        this.setState({
          chapterList: store.chapterList
        });
      } else {
        this.getBookOrigin(bookId);
      }
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
            const {chapters: chapterList} = data;
            this.setState({
              chapterList
            });
            store.chapterList = chapterList
          }
        )
    }

    render() {
      const {
        chapterList
      } = this.state;

      return (
        <Component {...this.props} chapterList={chapterList}/>
      )
    }
  }
}
