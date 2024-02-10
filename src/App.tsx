import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SongPage from './components/SongPage';
import EditSongPage from './components/EditSongPage';
import StatisticsPage from './components/StatisticsPage';
import CreateSongPage from './components/CreateSongPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/song/:id" element={<SongPage />} />
        <Route path="/song/:id/edit" element={<EditSongPage />} />
        <Route path="/song/create" element={<CreateSongPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
