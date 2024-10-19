import { t } from "i18next";
import styles from "./sideProjectMenu.module.css"
import { Divider } from "@mui/material";

const SideProjectMenu = () => {
    const projectId = 1;
    return (
        <div className={styles.sideProjectMenu}>
            <a className={styles.menuItem} href={`${projectId}/about-project`}>
                {t("projectMenu.aboutProject")}
            </a>
            <Divider/>
            <a className={styles.menuItem} href={`${projectId}/team`}>
                {t("projectMenu.team")}
            </a>
            <Divider/>
            <a className={styles.menuItem} href={`${projectId}/timeline`}>
                {t("projectMenu.timeline")}
            </a>
            <Divider/>
            <a className={styles.menuItem} href={`${projectId}/tasks`}>
                {t("projectMenu.tasks")}
            </a>
            <Divider/>
            <a className={styles.menuItem} href={`${projectId}/reports`}>
                {t("projectMenu.reports")}
            </a>
            <Divider/>
        </div>
    )
}
export default SideProjectMenu;