import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/Bookshelf';

function App() {
  return (
    <Router>  {/* Wrap the entire application with Router */}
      <Routes>
        <Route path="/" element={<BookSearch />} />  {/* Correct path for root */}
        <Route path="/bookshelf" element={<Bookshelf />} />  {/* Path for bookshelf */}
      </Routes>
    </Router>
  );
}

export default App;
