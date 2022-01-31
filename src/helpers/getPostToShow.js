const getPostToShow = (currentPage, postPerPage) => {
  return {
    first: currentPage * postPerPage - postPerPage,
    last: currentPage * postPerPage,
  };
};

export { getPostToShow };
