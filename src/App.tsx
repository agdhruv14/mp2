import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListView from './pages/ListView';
import GalleryView from './pages/GalleryView';
import DetailView from './pages/DetailView';

export default function App() {
  return (
    <BrowserRouter basename="/mp2">
      <header className="app-header">
        <h1>MP2</h1>
        <nav>
          <Link to="/">List</Link>
          <span> | </span>
          <Link to="/gallery">Gallery</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/detail/:name" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}
