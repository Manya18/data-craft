import { t } from "i18next";
import styles from "./sideProjectMenu.module.css"
import { Divider } from "@mui/material";
import { menuItems } from "../../dataStructures/projectMenuData";

const SideProjectMenu = () => {
    const projectId = 1;
    const currentPath = (new URL(window.location.href)).pathname.slice(1);

    return (
        <div className={styles.sideProjectMenu}>
            {menuItems.map((menuItem, index) => (
                <div key={index}>
                    <a className={styles.menuItem + " " + (currentPath===menuItem.path && styles.active)} href={`${projectId}/${menuItem.path}`}>
                        {t(`projectMenu.${menuItem.title}`)}
                    </a>
                    <Divider/>
                </div>
            ))}
        </div>
    )
}
export default SideProjectMenu;