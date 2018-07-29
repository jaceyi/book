export default {
  searchBook: param => `/api/book/fuzzy-search?query=${param}&start=0`,
  getBook: param => `/api/book/${param}`,
  getBookOrigin: param => `/api/toc?view=summary&book=${param}`,
  getChapterList: param => `/api/toc/${param}?view=chapters`,
  getChapter: param => `/chapter/${param}`
}
