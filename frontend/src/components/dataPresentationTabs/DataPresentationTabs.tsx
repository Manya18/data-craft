import { t } from 'i18next';
import styles from './dataPresentationTabs.module.css'
import { Divider } from '@mui/material';
import { isTabActive } from '../../logic/getActiveTab';

const DataPresentationTabs = () => {
    const tabs = ['table', 'gantt', 'kanban', 'analysis'];
    return(
        <div className={styles.tabsWrapper}>
            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <a key={tab} className={styles.tab + " " + (isTabActive(tab) && styles.active)} href={tab}>
                        {t(`tabs.${tab}`)}
                    </a>
                ))}
            </div>
            <Divider></Divider>
        </div>
    )
}
export default DataPresentationTabs;