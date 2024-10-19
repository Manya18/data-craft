import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import SettingsPage from './pages/settingsPage/SettingsPage';
import useLocalStorage from 'use-local-storage'

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [colorTheme, setColorTheme] = useLocalStorage('colorTheme', 'blue');


  return (
    <BrowserRouter>
      <div className="App" data-theme={`${theme}-${colorTheme}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/candidates" element={<CandidatesPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
