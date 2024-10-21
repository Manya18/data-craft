import React from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./ViewSwitcher";
import { getStartEndDateForProject, initTasks } from "./initTasks";
import "gantt-task-react/dist/index.css";
import "./gant.css";
import { t } from "i18next";
import { StandardTooltipContent, Tooltip } from "./tooltip";

const Gant = () => {
    const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
    const [tasks, setTasks] = React.useState<Task[]>(initTasks());
    const [isChecked, setIsChecked] = React.useState(true);
    let columnWidth = 65;
    if (view === ViewMode.Year) {
        columnWidth = 350;
    } else if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleTaskChange = (task: Task) => {
        console.log("On date change Id:" + task.id);
        let newTasks = tasks.map(t => (t.id === task.id ? task : t));
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
            if (
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {
                const changedProject = { ...project, start, end };
                newTasks = newTasks.map(t =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTasks(newTasks);
    };

    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTasks(tasks.filter(t => t.id !== task.id));
        }
        return conf;
    };

    const handleProgressChange = async (task: Task) => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };

    const handleDblClick = (task: Task) => {
        alert("On Double Click event Id:" + task.id);
    };

    const handleClick = (task: Task) => {
        console.log("On Click event Id:" + task.id);
    };

    const handleSelect = (task: Task, isSelected: boolean) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task: Task) => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On expander click Id:" + task.id);
    };

    //цвет для блока "сегодня"
    document.addEventListener('DOMContentLoaded', () => {
        const rectElement = document.querySelector('.today rect');
        if (rectElement) {
            rectElement.classList.add('custom-rect');
            rectElement.setAttribute('fill', 'var(--opacity-accent)');
        }
    });

    return (
        <div className="Wrapper">
            <ViewSwitcher
                onViewModeChange={viewMode => setView(viewMode)}
                onViewListChange={setIsChecked}
                isChecked={isChecked}
            />
            <h3>{t(`gant.title`)}</h3>
            <Gantt
                tasks={tasks}
                viewMode={view}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                //onDoubleClick={handleDblClick} -- добавить окно редактирования задачи
                //onClick={handleClick}
                onSelect={handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                columnWidth={columnWidth}
                TooltipContent={StandardTooltipContent}
                locale="ru" // or en
                barProgressColor="var(--accent)"
                barBackgroundColor="#98a1a9"
                barProgressSelectedColor="var(--opacity-accent)"
                barBackgroundSelectedColor="#98a1a9b2"
            />
        </div>
    );
};

export default Gant;


