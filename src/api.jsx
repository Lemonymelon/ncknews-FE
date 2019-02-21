import axios from 'axios';

const BASE_URL = 'https://lm-knews.herokuapp.com';

export const fetchArticles = async () => {
  const { data: { articles } } = await axios.get(`${BASE_URL}/api/articles`);
  // console.log(articles);
  return articles;
};

export const fetchSingleArticle = async (article_id) => {
  const { data: { article } } = await axios.get(`${BASE_URL}/api/articles/${article_id}`);
  // console.log(articles);
  return article;
};

export const addArticle = async (topic, articleObj) => {
  console.log(articleObj, topic);
  const { data } = await axios.post(`${BASE_URL}/api/topics/${topic}/articles`);
  console.log(data);
  return data;
};

export const fetchTopics = async () => {
  const { data: { topics } } = await axios.get(`${BASE_URL}/api/topics`);
  // console.log(topics);
  return topics;
};

export const fetchArticlesByTopic = async (topic) => {
  const { data: { articles } } = await axios.get(`${BASE_URL}/api/topics/${topic}/articles`);
  return articles;
};

export const fetchCommentsByArticle = async (article_id) => {
  const { data: { comments } } = await axios.get(`${BASE_URL}/api/articles/${article_id}/comments`);
  return comments;
};

export const fetchUsers = async () => {
  const { data: { users } } = await axios.get(`${BASE_URL}/api/users`);
  return users;
};
