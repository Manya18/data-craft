import React from "react";
import "gantt-task-react/dist/index.css";
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
    return (
        <div className="ViewContainer">
            <button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
                {t(`gant.day`)}
            </button>
            <button
                className="Button"
                onClick={() => onViewModeChange(ViewMode.Week)}
            >
                {t(`gant.week`)}

            </button>
            <button
                className="Button"
                onClick={() => onViewModeChange(ViewMode.Month)}
            >
                {t(`gant.month`)}
            </button>

            <button
                className="Button"
                onClick={() => onViewModeChange(ViewMode.Year)}
            >
                {t(`gant.year`)}
            </button>

            <div className="Switch">
                <label className="Switch_Toggle">
                    <input
                        type="checkbox"
                        defaultChecked={isChecked}
                        onClick={() => onViewListChange(!isChecked)}
                    />
                    <span className="Slider" />
                </label>
                {t(`gant.showTable`)}
            </div>
        </div>
    );
};
