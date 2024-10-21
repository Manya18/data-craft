import React from "react";
import "gantt-task-react/dist/index.css";
import styles from "./ViewSwitcher.module.css";
import { ViewMode } from "gantt-task-react";
import { t } from "i18next";
type ViewSwitcherProps = {
    isChecked: boolean;
    onViewListChange: (isChecked: boolean) => void;
    onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
    onViewModeChange,
    onViewListChange,
    isChecked
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMode = event.target.value as ViewMode;
        onViewModeChange(selectedMode);
    };
    return (
        <div className={styles.viewContainer}>
            <select onChange={handleChange} defaultValue={ViewMode.Day}>
                <option value={ViewMode.Day}>{t(`gant.day`)}</option>
                <option value={ViewMode.Week}>{t(`gant.week`)}</option>
                <option value={ViewMode.Month}>{t(`gant.month`)}</option>
                <option value={ViewMode.Year}>{t(`gant.year`)}</option>
            </select>

            <div className={styles.switch}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        defaultChecked={isChecked}
                        onClick={() => onViewListChange(!isChecked)}
                    />
                    <span className="Slider" />
                {t(`gant.showTable`)}
            </div>
        </div>
    );
};
