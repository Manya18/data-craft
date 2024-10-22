import SideMenu from "../sideMenu/SideMenu";
import styles from "./pageLayout.module.css"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const PageLayout = ({projectMenu, title, children} : {projectMenu?: boolean | false, title?: string, children: React.ReactNode}) => {
    return (
        <div className={styles.pageLayout}>
            <SideMenu projectMenu={projectMenu}></SideMenu>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <span className={styles.title}>{title}</span>
                    <div className={styles.avatar}>
                        <AccountCircleOutlinedIcon fontSize="large"/>
                    </div>
                </div>
                <div className={styles.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default PageLayout;