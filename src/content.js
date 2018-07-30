import React from 'react';
import {getBook, getBookOrigin, getChapterList} from "./requests";

const store = {
  chapterList: [],
  bookInfo: {},
  order: true
};

export default function content(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        chapterList: [],
        bookInfo: {},
        order: true,
        loading: false
      };
    }

    componentWillMount() {
      const bookId = this.props.match.params.id;
      const {bookInfo} = store;

      if (bookInfo._id === bookId && store.chapterList.length) {
        this.setState({
          ...store
        });
      } else {
        this.setState({
          loading: true
        });
        this.getBook(bookId);
        this.getBookOrigin(bookId);
      }
    }

    async getBook(id) {
      await getBook(id)
        .then(
          data => {
            store.bookInfo = data;
            this.setState({
              bookInfo: data
            });
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
            const {chapters: chapterList} = data;
            store.chapterList = chapterList;
            this.setState({
              chapterList,
              loading: false
            })
          }
        )
    }

    reverseChapterList() {
      const {
        chapterList,
        order
      } = this.state;

      const _ = {
        order: !order,
        chapterList: chapterList.reverse()
      };

      this.setState(_);
      Object.assign(store, _)
    }

    render() {
      const {
        reverseChapterList
      } = this;

      return (
        <Component {...this.props}
                   {...this.state}
                   reverseChapterList={reverseChapterList.bind(this)}/>
      )
    }
  }
}
