import axios from 'axios';

const BASE_URL = 'https://lm-knews.herokuapp.com/api';

export const fetchArticles = async (sort_by) => {
  const params = sort_by ? { sort_by } : '';
  console.log(params);
  const { data: { articles } } = await axios.get(`${BASE_URL}/articles`, { params });
  // console.log(articles);
  return articles;
};

export const fetchSingleArticle = async (article_id) => {
  const { data: { article } } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  // console.log(articles);
  return article;
};

export const addArticle = async (topic, articleObj) => {
  const { data: { article } } = await axios.post(`${BASE_URL}/topics/${topic}/articles`, articleObj);
  return article;
};

export const removeArticle = async (article_id) => {
  const { data } = await axios.delete(`${BASE_URL}/articles/${article_id}`);
  return data;
};

export const updateArticleVotes = async (article_id, inc_votes) => {
  console.log(inc_votes, 'api');
  const { data: { article } } = await axios.patch(`${BASE_URL}/articles/${article_id}`, inc_votes);
  console.log(article);
  return article;
};

export const addTopic = async (topic) => {
  const { data } = await axios.post(`${BASE_URL}`);
};

export const fetchTopics = async () => {
  const { data: { topics } } = await axios.get(`${BASE_URL}/topics`);
  // console.log(topics);
  return topics;
};

export const fetchArticlesByTopic = async (topic) => {
  const { data: { articles } } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
  return articles;
};


export const addCommentToArticle = async (article_id, commentObject) => {
  const { data: { comment } } = await axios.post(`${BASE_URL}/articles/${article_id}/comments`, commentObject);
  return comment;
};


export const fetchCommentsByArticle = async (article_id) => {
  const { data: { comments } } = await axios.get(`${BASE_URL}/articles/${article_id}/comments`);
  return comments;
};

export const fetchUsers = async () => {
  const { data: { users } } = await axios.get(`${BASE_URL}/users`);
  return users;
};
