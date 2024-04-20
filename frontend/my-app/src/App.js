import React, { useState } from 'react';
import './App.css';
import Header from 'quicknav';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`hhttp://localhost:5000/search?query=${query}`);
      const data = await response.json();
      setResults(data);
      if (data.length === 0) {
        setError('No movie quotes found.');
      }
    } catch (error) {
      console.error('Error searching for movie quotes:', error);
      setError('An error occurred while searching for movie quotes.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
    <Header  variant={"dark"}
      brandText={"QuoDB"}
      navItems={["Home", "Search", "About", "Blog"]} 
      navLinks={["Home", "Search", "About", "Blog"]} 
      dropdownItems={[]}
    />
    
    <div className="App" style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Movie Quote Search</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter movie quote..."
          style={{ padding: '10px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}
        />
        <button onClick={handleSearch} style={{ backgroundColor: 'orange', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {results.map((quote, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px', margin: '10px', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://cdn.storyboardthat.com/storyboard-srcsets/poster-templates/movie-poster-5.png" alt="Movie poster" style={{ width: '80px', height: '120px', borderRadius: '4px', marginBottom: '20px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{quote.dialogue}</p>
              <p style={{ marginBottom: '5px' }}>Movie: {quote.movie}</p>
              <p>Character: {quote.character}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              <i className="fa fa-star"></i>
              <i className="fa fa-comments"></i>
              <i className="fa fa-share"></i>
            </div>
          </div>
        ))}       
      </div>
    </div>
    </>
  );
}

export default App;
