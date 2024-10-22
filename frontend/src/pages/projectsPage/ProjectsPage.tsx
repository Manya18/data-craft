import { Outlet } from "react-router-dom";
import styles from "./projectsPage.module.css";

const ProjectsPage = () => {
  return (
    <div className={styles.projectPage}>
      projects page
      <Outlet/>
    </div>
  );
};
export default ProjectsPage;
