import { t } from "i18next";
import styles from "./dataControlRow.module.css"
import TuneIcon from '@mui/icons-material/Tune';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const DataControlRow = () => {

    return (
        <div className={styles.dataRowControl}>
            <div className={styles.searchGroup}>
                <input type="text" className={styles.search} placeholder={t('search')}/>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button + " outlined-button"}>
                    <SwapVertIcon/>
                    {t("buttons.sorting")}
                </button>
                <button className={styles.button + " outlined-button"}>
                    <TuneIcon/>
                    {t("buttons.filters")}
                </button>
                <button className={styles.add + " primary-button"}>
                    {t("buttons.add")}
                </button>
            </div>
        </div>
    )
}

export default DataControlRow;