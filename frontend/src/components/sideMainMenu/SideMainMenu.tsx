import styles from "./sideMainMenu.module.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { t } from "i18next";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { Divider } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const SideMainMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const currentPath = (new URL(window.location.href)).pathname.slice(1)

  const projects = [
    {
      id: 1,
      title: "Проект 1",
    },
    {
      id: 2,
      title: "Проект с очень длинным названием",
    },
    {
      id: 3,
      title: "Проект 2",
    },
  ];

  return (
    <div
      className={styles.sideMenu + " " + (!isMenuOpen ? styles.closedMenu : "")}
    >
      <div className={styles.logo}>
        {isMenuOpen && <h1 className={styles.menuTitle}>DataCraft</h1>}
        {isMenuOpen ? (
          <MenuOpenIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
        ) : (
          <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
        )}
      </div>
      <Divider className={styles.divider} />
      <a
        className={styles.menuItem + " " + styles.projectsBtn + " " + (currentPath==="projects" && styles.active)}
        href="/projects"
      >
        <div className={styles.projectButtonGroup}>
          <FactCheckOutlinedIcon />
          {isMenuOpen && t("menu.projects")}
        </div>
        {isMenuOpen && (
          <button
            className={styles.openProjectList}
            onClick={(e) => {
              e.preventDefault();
              setIsProjectsOpen(!isProjectsOpen);
            }}
          >
            {isProjectsOpen ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </button>
        )}
      </a>
      <Divider className={styles.divider} />
      <div className={styles.projectsList}>
        {isProjectsOpen &&
          isMenuOpen &&
          projects.map((project) => (
            <div key={project.id} className={styles.projectsListItem}>
              <a href={`/projects${project.id}`} title={project.title}>
                {project.title}
              </a>
              <Divider />
            </div>
          ))}
      </div>
      <a className={styles.menuItem + " " + (currentPath==="tasks-assigned-by-me" && styles.active)} href="/tasks-assigned-by-me">
        <ChecklistOutlinedIcon />
        {isMenuOpen && t("menu.myTasks")}
      </a>
      <Divider className={styles.divider} />
      <a className={styles.menuItem + " " + (currentPath==="settings" && styles.active)} href="/settings">
        <SettingsOutlinedIcon />
        {isMenuOpen && t("menu.settings")}
      </a>
      <Divider className={styles.divider} />
    </div>
  );
};

export default SideMainMenu;
