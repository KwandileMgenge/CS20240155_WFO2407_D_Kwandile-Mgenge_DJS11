import { useQuery } from '@tanstack/react-query'
import { getPodcastPreviews } from '../PodcastData'
import React from 'react'

function Previews() {
  const { status, error, data: previews } = useQuery({
    queryKey: ['previews'],
    queryFn: getPodcastPreviews,
  })

  if (status === 'pending') return <p className='loading'>Loading podcasts...</p>
  if (status === 'error') return <p className='error'>Error: {error.message}</p>

  const sortedPreviews = [...previews].sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div>Previews</div>
  )
}

export default Previews