import SideMenu from "../sideMenu/SideMenu";
import styles from "./pageLayout.module.css"

const PageLayout = ({projectMenu, children} : {projectMenu: boolean, children: React.ReactNode}) => {
    return (
        <div className={styles.pageLayout}>
            <SideMenu projectMenu={projectMenu}></SideMenu>
            {children}
        </div>
    )
}
export default PageLayout;