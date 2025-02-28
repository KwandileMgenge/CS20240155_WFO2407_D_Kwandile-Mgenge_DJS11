import { useQuery } from '@tanstack/react-query';
import { genreList, getPodcastPreviews } from '../PodcastData';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Previews() {
  const { status, error, data: previews } = useQuery({
    queryKey: ['previews-data'],
    queryFn: getPodcastPreviews,
  });

  // State for filters and sorting
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOption, setSortOption] = useState('title-asc');
  const [searchQuery, setSearchQuery] = useState('');

  if (status === 'pending') return <p className='loading'>Loading podcasts...</p>;
  if (status === 'error') return <p className='error'>Error: {error.message}</p>;

  // Filter by genre
  const filteredByGenre = selectedGenre === 'All'
    ? previews
    : previews.filter((podcast) => podcast.genres.includes(parseInt(selectedGenre)));

  // Filter by search query
  const filteredBySearch = filteredByGenre.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting function
  const sortedPreviews = [...filteredBySearch].sort((a, b) => {
    if (sortOption === 'title-asc') return a.title.localeCompare(b.title);
    if (sortOption === 'title-desc') return b.title.localeCompare(a.title);
    if (sortOption === 'newest') return new Date(b.updated) - new Date(a.updated);
    if (sortOption === 'oldest') return new Date(a.updated) - new Date(b.updated);
    return 0;
  });

  return (
    <div className='previews-page'>
      <h2>Explore Podcasts</h2>

      {/* Search, Genre, and Sort Controls */}
      <div className='filters'>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search podcasts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Genre Filter */}
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="All">All Genres</option>
          {Object.entries(genreList).map(([genreId, genreName]) => (
            <option key={genreId} value={genreId}>{genreName}</option>
          ))}
        </select>

        {/* Sorting Options */}
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Podcast Previews */}
      <div className='previews-container'>
        {sortedPreviews.length > 0 ? (
          sortedPreviews.map((podcast) => (
            <Link to={`podcast/${podcast.id}`} key={podcast.id} className='preview-link'>
              <div className='podcast-tile'>
                <div className='podcast-img-container'>
                  <img className='preview-img' src={podcast.image} alt="Preview Image" />
                  <div className='genre-list'>
                    {podcast.genres.map((genreId) => (
                      <p key={genreId}>{genreList[genreId] || 'Unknown Genre'}</p>
                    ))}
                  </div>
                </div>
                <h3>{podcast.title}</h3>
                <p>{new Date(podcast.updated).toLocaleDateString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-results">No podcasts found.</p>
        )}
      </div>
    </div>
  );
}

export default Previews;