const getPages = (products, productsPerPage) => {
  return Math.ceil(products / productsPerPage);
};
export { getPages };
