import PageLayout from "../../templates/pageLayout/PageLayout";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <PageLayout projectMenu={true}>
        <div className={styles.homePage}></div>
    </PageLayout>
  );
};

export default HomePage;
