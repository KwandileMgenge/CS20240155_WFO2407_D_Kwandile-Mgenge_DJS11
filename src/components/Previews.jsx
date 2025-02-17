import { useQuery } from '@tanstack/react-query'
import { getPodcastPreviews } from '../PodcastData'
import React from 'react'

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
          <div className='podcast-tile' key={podcast.id}>
            <div className='podcast-img'>
              <img src={podcast.image} alt="podcast image" />
            </div>
            <h3>{podcast.title}</h3>
            <p>{podcast.updated.slice(0,10)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Previews