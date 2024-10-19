import SideMainMenu from "../../components/sideMainMenu/SideMainMenu";
import SideProjectMenu from "../../components/sideProjectMenu/SideProjectMenu";
import PageLayout from "../../templates/pageLayout/PageLayout";
import SideMenu from "../../templates/sideMenu/SideMenu";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <PageLayout projectMenu={true}>
        <div className={styles.homePage}></div>
    </PageLayout>
  );
};

export default HomePage;
