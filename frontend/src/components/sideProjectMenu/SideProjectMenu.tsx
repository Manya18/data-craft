import { t } from "i18next";
import styles from "./sideProjectMenu.module.css"
import { Divider } from "@mui/material";
import { menuItems } from "../../logic/projectMenuData";
import { isTabActive } from "../../logic/getActiveTab";

const SideProjectMenu = () => {
    const projectId = 1;

    return (
        <div className={styles.sideProjectMenu}>
            {menuItems.map((menuItem, index) => (
                <div key={index}>
                    <a className={styles.menuItem + " " + (isTabActive(menuItem.path) && styles.active)} href={`/projects/${projectId}/${menuItem.path}`}>
                        {t(`projectMenu.${menuItem.title}`)}
                    </a>
                    <Divider/>
                </div>
            ))}
        </div>
    )
}
export default SideProjectMenu;