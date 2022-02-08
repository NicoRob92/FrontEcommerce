const getPostsToShow = (currentPage, postPerPage) => {
  return {
    first: currentPage * postPerPage - postPerPage,
    last: currentPage * postPerPage,
  };
};

export { getPostsToShow };
