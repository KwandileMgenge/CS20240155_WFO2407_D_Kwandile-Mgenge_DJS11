import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPodcastPreviews, genreList } from '../PodcastData'
import { Link } from 'react-router-dom'

function FeaturedPodcasts() {
  const { status, error, data: previews } = useQuery({
    queryKey: ['previews-data'],
    queryFn: getPodcastPreviews,
  })

  if (status === 'pending') return <p className='loading'>Loading featured podcasts...</p>
  if (status === 'error') return <p className='error'>Error: {error.message}</p>

  // Filter podcasts that include the featured genre ID
  const filteredPodcasts = previews.filter(podcast => 
    podcast.genres.includes('Featured')
  )

  return (
    <div className='featured-section'>
      <h2>Popular Podcasts</h2>
      <div className='previews-container'>
        {filteredPodcasts.map((podcast) => (
          <Link to={`podcast/${podcast.id}`} key={podcast.id} className='preview-link'>
            <div className='podcast-tile'>
              <div className='podcast-img-container'>
                <img className='preview-img' src={podcast.image} alt={podcast.title} />
                <div className='genre-list'>
                  {podcast.genres.map((genreId) => (
                    <p key={genreId}>{genreList[genreId]}</p>
                  ))}
                </div>
              </div>
              <h3>{podcast.title}</h3>
              <p>{podcast.updated.slice(0, 10)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeaturedPodcasts
