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
      {pagesToShow.map((e) => (
        <Page key={e} page={e} setPage={props.setPage} />
      ))}
    </>
  );
};
export default Paginate;
