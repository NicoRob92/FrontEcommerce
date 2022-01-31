import styles from "./_Page.module.scss";

const Page = (props) => {
  return (
    <>
      <input className={styles.page}type="button" value={props.page} onClick={props.setPage}></input>
    </>
  );
};
export default Page;
