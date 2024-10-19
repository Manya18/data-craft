import { useTranslation } from "react-i18next";
import styles from "./settingsPage.module.css";
import useLocalStorage from "use-local-storage";
import PageLayout from "../../templates/pageLayout/PageLayout";

const lngs = [
  { code: "en", native: "english" },
  { code: "ru", native: "russian" },
];

const SettingsPage = () => {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const [colorTheme, setColorTheme] = useLocalStorage("colorTheme", "blue");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const switchColorTheme = () => {
    const newTheme = colorTheme === "blue" ? "red" : "blue";
    setColorTheme(newTheme);
  };

  const { t, i18n } = useTranslation();
  const handleTrans = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    // <div className="SettingsPage">
    //   <h1 className={styles.title}>{t("english")}</h1>
    //   {lngs.map((lng, i) => {
    //     const { code, native } = lng;
    //     return <button onClick={() => handleTrans(code)}>{native}</button>;
    //   })}
    //   <h1 className="gg">Руддд</h1>
    //   <div className="ff"></div>
    //   <button onClick={switchTheme}>switch</button>
    //   <button onClick={switchColorTheme}>switch color</button>
    // </div>
    <PageLayout projectMenu={false}>
      <div className={styles.settings}>
        <div className={styles.theme}></div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
