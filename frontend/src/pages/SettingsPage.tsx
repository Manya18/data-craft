import { useTranslation } from "react-i18next";

const lngs = [
  { code: "en", native: "english" },
  { code: "ru", native: "russian" },
];

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const handleTrans = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="SettingsPage">
      <h1>{t("helloWorld")}</h1>
      {lngs.map((lng, i) => {
        const { code, native } = lng;
        return <button onClick={() => handleTrans(code)}>{native}</button>;
      })}
    </div>
  );
};

export default SettingsPage;
