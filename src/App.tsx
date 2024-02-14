import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SongPage from './components/SongPage';
import EditSongPage from './components/EditSongPage';
import StatisticsPage from './components/StatisticsPage';
import CreateSongPage from './components/CreateSongPage';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { Global, css } from '@emotion/react';

const globalStyles = css`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: ${theme.fonts.body}
}
  main, header{

    padding: ${theme.space[2]}px; /* Default padding */

    @media (min-width: ${theme.breakpoints.sm}px) {
      padding: ${theme.space[3]}px; /* Adjust padding for small breakpoints */
    }

    @media (min-width: ${theme.breakpoints.md}px) {
      padding: ${theme.space[4]}px; /* Adjust padding for medium breakpoints */
    }

    @media (min-width: ${theme.breakpoints.lg}px) {
      padding: ${theme.space[5]}px; /* Adjust padding for large breakpoints */
    }
  }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Global styles={globalStyles} />
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<main><HomePage /></main>} />
          <Route path="/song/:id" element={<main><SongPage /></main>} />
          <Route path="/song/:id/edit" element={<main><EditSongPage /></main>} />
          <Route path="/song/create" element={<main><CreateSongPage /></main>} />
          <Route path="/statistics" element={<main><StatisticsPage /></main>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
