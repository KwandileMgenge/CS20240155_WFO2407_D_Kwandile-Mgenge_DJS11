import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPodcastDetails } from '../PodcastData'

function PodcastDetails() {
  const params = useParams()

  const { status, error, data: podcast } = useQuery({
    queryKey: [`podcast-data`, params.id],
    queryFn: () => getPodcastDetails(params.id),
  })

  if (status === 'pending') return <p className='loading'>Loading podcast...</p>
  if (status === 'error') return <p className='error'>Error: {error.message}</p>

  console.log(podcast)

  return (
    <div>PodcastDetails</div>
  )
}

export default PodcastDetails