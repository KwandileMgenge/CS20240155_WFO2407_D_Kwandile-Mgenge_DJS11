import { useQuery } from '@tanstack/react-query'
import { genreList, getPodcastPreviews } from '../PodcastData'
import React from 'react'
import { Link } from 'react-router-dom'

function Previews() {
  const { status, error, data: previews } = useQuery({
    queryKey: ['previews-data'],
    queryFn: getPodcastPreviews,
  })

  if (status === 'pending') return <p className='loading'>Loading podcasts...</p>
  if (status === 'error') return <p className='error'>Error: {error.message}</p>

  const sortedPreviews = [...previews].sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className='previews-page'>
      <h2>Explore Podcasts</h2>
      <div className='previews-container'>
        {sortedPreviews.map((podcast) => (
          <Link to={`podcast/${podcast.id}`} key={podcast.id} className='preview-link'>
            <div className='podcast-tile'>
              <div className='podcast-img-container'>
                <img className='preview-img' src={podcast.image} alt="Preview Image" />
                <div className='genre-list'>
                  {podcast.genres.map( (genreId) => (
                    <p key={genreId}>
                      {genreList[genreId]}
                    </p>
                  ))}
                </div>
              </div>
              <h3>{podcast.title}</h3>
              <p>{podcast.updated.slice(0,10)}</p>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
  )
}

export default Previews