import React, { useState, useEffect } from 'react';
import '../../src/Bookshelf.css';
import { useNavigate } from 'react-router-dom';
const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  useEffect(() => {
    const storedBooks = localStorage.getItem('bookshelf');
    setBookshelf(storedBooks ? JSON.parse(storedBooks) : []);
  }, []);

  const removeFromBookshelf = (book) => {
    const updatedBookshelf = bookshelf.filter((item) => item.key !== book.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };
  const handleback = () => {
    navigate('/'); // Navigate to the "/bookshelf" route
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedBooks = bookshelf.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bookshelf">
      <h1>My Bookshelf</h1>
      <div className="pagination">
        {Array.from({ length: Math.ceil(bookshelf.length / itemsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <ul>
        {selectedBooks.map((book) => (
          <li key={book.key || book.isbn[0].isbn10}>
            <h2>{book.title}</h2>
            {book.author && <p>Author: {book.author.name[0]}</p>}
            {book.cover_i && (
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`} alt={book.title} />
            )}
            <button onClick={() => removeFromBookshelf(book)}>Remove from Bookshelf</button>
           
          </li>
        ))}
      </ul>
      
      <button onClick={handleback}>Go Back</button>
    </div>
  );
};

export default Bookshelf;
