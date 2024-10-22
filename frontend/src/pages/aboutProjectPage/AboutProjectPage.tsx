import { t } from "i18next";
import PageLayout from "../../templates/pageLayout/PageLayout";
import styles from "./aboutProjectPage.module.css";

const AboutProjectPage = () => {
  const project = {
    title: 'Проект 1',
    goal: "Цель цель цельцель цель цель цельцель цельцель цельцель цельцель цельцель цельцель цельцель цельцель цельцель",
    description: "Описание Описание Описание Описание ОписаниеОписаниеОписание Описание Описание Описание ОписаниеОписаниеОписание Описание",
    current_status: "Новый",
    start_date: "14.10.2024",
    final_date: "14.10.2025",
    budget: 1000000,
    documents: ["document1.docx"]
  }

  return (
    <PageLayout projectMenu={true} title={project.title}>
      <div className={styles.aboutProjectPage}>
        <div className={styles.groupWrapper}>
          <label className={styles.label}>{t("aboutProject.title")}</label>
          <input className={styles.input} value={project.title} onChange={() => {}} readOnly={true}/>
        </div>
        <div className={styles.groupWrapper}>
          <label className={styles.label}>{t("aboutProject.dates")}</label>
          <div className={styles.dateGroup}>
            <input className={styles.date} type="date" value={project.start_date} onChange={() => {}}/>
            <input className={styles.date} type="date" value={project.start_date} onChange={() => {}}/>
          </div>
        </div>
        <div className={styles.groupWrapper}>
          <label className={styles.label}>{t("aboutProject.budget")}</label>
          <input className={styles.input} type="number" value={project.budget} onChange={() => {}}/>
        </div>
        <div className={styles.groupWrapper}>
          <label className={styles.label}>{t("aboutProject.goal")}</label>
          <textarea className={styles.input} rows={3} value={project.goal} onChange={() => {}}/>
        </div>
        <div className={styles.groupWrapper}>
          <label className={styles.label}>{t("aboutProject.description")}</label>
          <textarea className={styles.input} rows={5} value={project.description} onChange={() => {}}/>
        </div>
        <div className={styles.groupWrapper}>
          <label className={styles.label}>{t("aboutProject.documents")}</label>
          <input className={styles.input} type="file"/>
        </div>
        <div className={styles.documents}>
          {project.documents.map((doc) => (
            <a className={styles.document} href="#">{doc}</a>
          ))}
        </div>
        <button className={styles.button + " primary-button"}>{t("save")}</button>
      </div>
    </PageLayout>
  );
};
export default AboutProjectPage;
