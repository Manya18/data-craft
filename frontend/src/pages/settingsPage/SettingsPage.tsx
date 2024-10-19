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

  const switchTheme = (theme: string) => {
    setTheme(theme);
  };
  const switchColorTheme = (color: string) => {
    setColorTheme(color);
  };

  const { t, i18n } = useTranslation();
  const handleTrans = (code: string) => {
    i18n.changeLanguage(code);
  };

  const colorSchemas = [
    "blueViolet",
    "blue",
    "lightBlue",
    "green",
    "darkGreen",
    "greenYellow",
    "violet",
    "lavander",
    "pink",
    "brown",
    "red",
    "orange",
  ];

  return (
    <PageLayout projectMenu={false}>
      <h1>{t("menu.settings")}</h1>
      <div className={styles.settings}>
        <div className={styles.settingWrapper}>
          <h2 className={styles.settingTitle}>{t("lang")}</h2>
          <div className={styles.settingsVariants}>
            {lngs.map((len) => (
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="langVariants"
                  onChange={() => handleTrans(len.code)}
                ></input>
                {t(`langVariants.${len.native}`)}
              </label>
            ))}
          </div>
        </div>
        <div className={styles.colorScheme}>
          <h3 className={styles.settingTitle}>{t("settings.colorScheme")}</h3>
          <div className={styles.colorPalette}>
            {colorSchemas.map((color, index) => (
              <button
                key={index}
                className={styles.color + " " + styles[color]}
                onClick={() => switchColorTheme(color)}
              ></button>
            ))}
          </div>
        </div>
        <div className={styles.colorTheme}>
          <h3 className={styles.settingTitle}>{t("settings.colorTheme")}</h3>
          <div className={styles.colorThemes}>
            <div className={styles.theme}>
              <div className={styles.lightThemeRect}></div>
              <div className={styles.lightThemeRadio}>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === "light"}
                    onChange={() => switchTheme("light")}
                    defaultChecked
                  ></input>
                  {t("settings.colorThemeVariants.light")}
                </label>
              </div>
            </div>
            <div className={styles.theme}>
              <div className={styles.darkThemeRect}></div>
              <div className={styles.darkThemeRadio}>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === "dark"}
                  onChange={() => switchTheme("dark")}
                ></input>
                <label>{t("settings.colorThemeVariants.dark")}</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.timeSettings}>
          <h2 className={styles.timeSettingsTitle}>
            {t("settings.timeSettings")}
          </h2>
          <div className={styles.settingWrapper}>
            <h2 className={styles.settingSubtitle}>
              {t("settings.weekStart")}
            </h2>
            <div className={styles.settingsVariants}>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="weekStart"
                  onChange={() => {}}
                ></input>
                {t("settings.weekStartVariants.sundey")}
              </label>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="weekStart"
                  onChange={() => {}}
                ></input>
                {t("settings.weekStartVariants.mondey")}
              </label>
            </div>
          </div>
          <div className={styles.settingWrapper}>
            <h2 className={styles.settingSubtitle}>
              {t("settings.timeFormat")}
            </h2>
            <div className={styles.settingsVariants}>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="timeFormat"
                  onChange={() => {}}
                ></input>
                {t("settings.timeFormatVariants.24hours")}
              </label>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="timeFormat"
                  onChange={() => {}}
                ></input>
                {t("settings.timeFormatVariants.12hours")}
              </label>
            </div>
          </div>
          <div className={styles.settingWrapper}>
            <h2 className={styles.settingSubtitle}>
              {t("settings.dateFormat")}
            </h2>
            <div className={styles.settingsVariants}>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="dateFormat"
                  onChange={() => {}}
                ></input>
                {t("settings.dateFormatVariant.mm/dd/gg")}
              </label>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="dateFormat"
                  onChange={() => {}}
                ></input>
                {t("settings.dateFormatVariant.dd/mm/gg")}
              </label>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="dateFormat"
                  onChange={() => {}}
                ></input>
                {t("settings.dateFormatVariant.mmddgg")}
              </label>
              <label className={styles.settingVariant}>
                <input
                  type="radio"
                  name="dateFormat"
                  onChange={() => {}}
                ></input>
                {t("settings.dateFormatVariant.ddmmgg")}
              </label>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
