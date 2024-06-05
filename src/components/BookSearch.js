import React, { useState, useEffect } from 'react';
import '../../src/BookSearch.css';
import { useNavigate } from 'react-router-dom'; 

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
 
  

  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&limit=10&page=1`);
        const data = await response.json();
        setSearchResults(data.docs || []); 
      };
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToBookshelf = (book) => {
    const currentBookshelf = localStorage.getItem('bookshelf') || '[]';
    const bookshelf = JSON.parse(currentBookshelf);
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    alert(`${book.title} has been added to your bookshelf!`); 
  };

  const handleNavigateToBookshelf = () => {
    navigate('/bookshelf'); // Navigate to the "/bookshelf" route
  };

  return (
    <div className="book-search">
      <h1>Book Search</h1>
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search for books..." />
      <button onClick={handleNavigateToBookshelf}>Go to Bookshelf</button>
      
      <ul>
        {searchResults.map((book) => (
          <li key={book.key || book.isbn[0].isbn10}>
            <h2>{book.title}</h2>
            {book.author && <p>Author: {book.author.name[0]}</p>}
            {book.cover_i && (
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`} alt={book.title} />
            )}
            <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default BookSearch;
