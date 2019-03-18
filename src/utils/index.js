export const formatDateArray = articlesOrComments => {
  const formattedArticlesOrComments = articlesOrComments.map(
    ({ created_at, ...restOfData }) => {
      const date = new Date(created_at);
      let day = date.getDate();
      day = day < 9 ? `0${day}` : day;
      let month = date.getMonth();
      month = month < 9 ? `0${month}` : month;
      const legibleDate = `${day}-${month}-${date.getFullYear()}`;
      return {
        ...restOfData,
        created_at: legibleDate
      };
    }
  );
  return formattedArticlesOrComments;
};

export const formatDateSingle = articleOrComment => {
  const { created_at, ...restOfData } = articleOrComment;
  const date = new Date(created_at);
  let day = date.getDate();
  day = day < 9 ? `0${day}` : day;
  let month = date.getMonth();
  month = month < 9 ? `0${month}` : month;
  const legibleDate = `${day}-${month}-${date.getFullYear()}`;
  const formattedArticleOrComment = { created_at: legibleDate, ...restOfData };
  return formattedArticleOrComment;
};

export const capitalise = string => {
  return `${string.split("")[0].toUpperCase()}${string
    .split("")
    .slice(1)
    .join("")
    .toLowerCase()}`;
};
