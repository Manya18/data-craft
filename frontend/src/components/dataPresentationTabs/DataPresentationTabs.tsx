import { t } from 'i18next';
import styles from './dataPresentationTabs.module.css'
import { Divider } from '@mui/material';

const DataPresentationTabs = () => {
    const tabs = ['table', 'gant', 'kanban', 'analysis'];
    const activeTab = 'table';

    return(
        <div className={styles.tabsWrapper}>
            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <div className={styles.tab + " " + (activeTab===tab && styles.active)}>
                        {t(`tabs.${tab}`)}
                    </div>
                ))}
            </div>
            <Divider></Divider>
        </div>
    )
}
export default DataPresentationTabs;