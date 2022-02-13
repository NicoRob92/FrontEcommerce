import Page from "../../components/Page/Page";

const Paginate = (props) => {
  let pagesToShow = [];

  let num = 1;
  while (num <= props.totalPages) {
    pagesToShow = [...pagesToShow, num];
    num++;
  }

  return (
    <>
      <input  type="button" value={"prev"} onClick={(e) => props.currentPage > 1 && props.setCurrentPage(props.currentPage - 1)}></input>
      {pagesToShow.map((e) => (
        <Page key={e} page={e} setPage={props.setPage} />
      ))}
      <input  type="button" value={"next"} onClick={(e) => props.currentPage < props.totalPages && props.setCurrentPage(props.currentPage + 1)}></input>
    </>
  );
};

export default Paginate;
