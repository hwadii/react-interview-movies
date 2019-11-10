export default {
  computePages: (numberOfElements, elementsPerPage) =>
    numberOfElements % elementsPerPage === 0
      ? numberOfElements / elementsPerPage
      : Math.floor(numberOfElements / elementsPerPage) + 1,

  checkShouldShowMovie: (idx, currentPage, elementsPerPage) =>
    (currentPage - 1) * elementsPerPage <= idx &&
    idx < currentPage * elementsPerPage
};
