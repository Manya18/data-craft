import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Page404 from './pages/page404/Page404';
import ProjectsPage from './pages/projectsPage/ProjectsPage';
import AboutProjectPage from './pages/aboutProjectPage/AboutProjectPage';
import SettingsPage from './pages/settingsPage/SettingsPage';
import TeamPage from './pages/teamPage/TeamPage';
import TimelinePage from './pages/timelinePage/TimelinePage';
import Gant from './pages/dataPresentation/Gant/gant';
import InteractiveTable from './pages/dataPresentation/InteractiveTable/InteractiveTable';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <Page404/>
  },
  {
    path: '/my-tasks',
    element: <HomePage/>,
  },
  {
    path: '/settings',
    element: <SettingsPage/>,
  },
  {
    path: '/projects',
    element: <ProjectsPage/>,
  },
  {
    path: '/projects/:id',
    children: [
      {
        path: '',
        element: <Navigate to="about-project" />
      },
      { 
        path: 'about-project', 
        element: <AboutProjectPage/>
      },
      { 
        path: 'team', 
        element: <TeamPage/>
      },
      { 
        path: 'analysis', 
        element: <HomePage/>
      },
      { 
        path: 'timeline', 
        element: <TimelinePage/>,
        children: [
          {
            path: '',
            element: <Navigate to="table" replace/>
          },
          {
            path: "table",
            element: <InteractiveTable/>
          },
          {
            path: "gantt",
            element: <Gant/>
          },
          {
            path: "kanban",
            element: <HomePage/>
          },
          {
            path: "analysis",
            element: <HomePage/>
          }
        ]
      },
      { 
        path: 'tasks', 
        element: <HomePage/>,
        children: [
          {
            path: "table",
            element: <HomePage/>
          },
          {
            path: "gantt",
            element: <HomePage/>
          },
          {
            path: "kanban",
            element: <HomePage/>
          },
          {
            path: "analysis",
            element: <HomePage/>
          }
        ]
      }
    ]
  },  
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);