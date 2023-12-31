import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Profiles = Loadable(lazy(() => import('../views/profiles/Profiles')));
const Profile = Loadable(lazy(() => import('../views/profiles/Profile')));
const MyProfile = Loadable(lazy(() => import('../views/profiles/MyProfile')));
const SavedProfiles = Loadable(lazy(() => import('../views/profiles/SavedProfiles')));
// const EditProfile = Loadable(lazy(() => import('../views/profiles/EditProfile')));
const SendMail = Loadable(lazy(() => import('../views/mails/SendMail')));
const HistoryMails = Loadable(lazy(() => import('../views/mails/HistoryMails')));
const Stat = Loadable(lazy(() => import('../views/stats/Stat')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/profiles', exact: true, element: <Profiles /> },
      { path: '/saved-profiles', exact: true, element: <SavedProfiles /> },
      { path: '/profile', exact: true, element: <Profile /> },
      { path: '/my-profile', exact: true, element: <MyProfile /> },
      // { path: '/edit_profile', exact: true, element: <EditProfile /> },
      { path: '/profile/:id', exact: true, element: <Profile /> },
      //{ path: '/edit_profile/:id', exact: true, element: <EditProfile /> },
      { path: '/mail-send/:id', exact: true, element: <SendMail /> },
      { path: '/mail-history', exact: true, element: <HistoryMails /> },
      { path: '/stat', exact: true, element: <Stat /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
