import axios from "axios";
import { formatDate } from "./utils";
const BASE_URL = "https://lm-knews.herokuapp.com/api";

export const fetchArticles = async sort_by => {
  const params = sort_by ? { sort_by } : "";
  const {
    data: { articles }
  } = await axios.get(`${BASE_URL}/articles`, { params });
  const formattedDateArticles = formatDate(articles);
  return formattedDateArticles;
};

export const fetchSingleArticle = async article_id => {
  const {
    data: { article }
  } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return article;
};

export const addArticle = async (topic, articleObj) => {
  const {
    data: { article }
  } = await axios.post(`${BASE_URL}/topics/${topic}/articles`, articleObj);
  console.log(article);
  return article;
};

export const removeArticle = async article_id => {
  const { data } = await axios.delete(`${BASE_URL}/articles/${article_id}`);
  return data;
};

export const updateArticleVotes = async (article_id, inc_votes) => {
  const {
    data: { article }
  } = await axios.patch(`${BASE_URL}/articles/${article_id}`, { inc_votes });
  return article;
};

export const addTopic = async (slug, description) => {
  const { data } = await axios.post(`${BASE_URL}/topics`, {
    slug,
    description
  });
};

export const fetchTopics = async () => {
  const {
    data: { topics }
  } = await axios.get(`${BASE_URL}/topics`);
  // console.log(topics);
  return topics;
};

export const fetchArticlesByTopic = async topic => {
  const {
    data: { articles }
  } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
  const formattedDateArticles = articles.map(
    ({ created_at, ...restOfData }) => {
      const date = new Date(created_at);
      console.log(date);
      const legibleDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      console.log(legibleDate);
      return {
        ...restOfData,
        created_at: legibleDate
      };
    }
  );
  return formattedDateArticles;
};

export const addCommentToArticle = async (article_id, commentObject) => {
  const {
    data: { comment }
  } = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    commentObject
  );
  return comment;
};

export const fetchCommentsByArticle = async article_id => {
  const {
    data: { comments }
  } = await axios.get(`${BASE_URL}/articles/${article_id}/comments`);
  return comments;
};

export const updateCommentVotes = async (article_id, inc_votes, comment_id) => {
  console.log(article_id, inc_votes, comment_id);
  const {
    data: { comment }
  } = await axios.patch(
    `${BASE_URL}/articles/${article_id}/comments/${comment_id}`,
    { inc_votes }
  );
  console.log(comment);
  return comment;
};

export const fetchUsers = async () => {
  const {
    data: { users }
  } = await axios.get(`${BASE_URL}/users`);
  return users;
};
