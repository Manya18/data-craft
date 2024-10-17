import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/tasks" element={<TasksPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/candidates" element={<CandidatesPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
