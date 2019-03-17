export const formatDate = articlesOrComments => {
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
