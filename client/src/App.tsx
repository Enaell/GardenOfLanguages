import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'

import counterpart from 'counterpart';
import localeFr from './app/locale/fr.json';
import localeEn from './app/locale/en.json';
import localeCn from './app/locale/cn.json';
import './App.css';
import { Column } from './features/common/Flexbox';
import { Routes } from './app/routes/Routes';
import { useAppSelector } from './app/redux/hooks';
import { userState } from './app/redux/userSlice';
import { Navbar } from './features/navbar/Navbar';
import Snackbar from './features/snackbar/Snackbar';

counterpart.registerTranslations('En', localeEn);
counterpart.registerTranslations('Fr', localeFr);
counterpart.registerTranslations('Cn', localeCn);


function App() {

  counterpart.setLocale('Fr');

  const { language } = useAppSelector(userState)

  useEffect(() => {
    language ? counterpart.setLocale(language)
    : counterpart.setLocale('Fr');
  }, [language]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
      <BrowserRouter>
        <Column horizontal='center' width='100%' style={{backgroundColor: '#f9f9f9'}}>
          <Navbar />
          <Snackbar />
          <Routes />
          {/* <Footer /> */}
        </Column>
      </BrowserRouter>
    </div>
  );
}

export default App;
