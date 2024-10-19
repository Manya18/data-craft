import SideMainMenu from "../../components/sideMainMenu/SideMainMenu";
import SideProjectMenu from "../../components/sideProjectMenu/SideProjectMenu";
import styles from "./sideMenu.module.css"

const SideMenu = ({projectMenu} : {projectMenu?: boolean}) => {
    
    return (
        <div className={styles.sideMenu}>
            <SideMainMenu></SideMainMenu>
            {projectMenu && <SideProjectMenu></SideProjectMenu>}
        </div>
    )
}
export default SideMenu;