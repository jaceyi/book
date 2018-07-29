import axios from 'axios';
import apis from './apis';

export async function searchBook(params) {
  const response = await axios.get(apis.searchBook(params));
  return response.data
}

export async function getBook(params) {
  const response = await axios.get(apis.getBook(params));
  return response.data
}

export async function getBookOrigin(params) {
  const response = await axios.get(apis.getBookOrigin(params));
  return response.data
}

export async function getChapterList(params) {
  const response = await axios.get(apis.getChapterList(params));
  return response.data
}

export async function getChapter(params) {
  const response = await axios.get(apis.getChapter(params));
  return response.data
}
