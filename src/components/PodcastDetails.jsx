import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPodcastDetails } from '../PodcastData';
import { useState } from 'react';
import { genreList } from '../PodcastData';

function PodcastDetails() {
  const params = useParams();
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { status, error, data: podcast } = useQuery({
    queryKey: [`podcast-data`, params.id],
    queryFn: () => getPodcastDetails(params.id),
  });

  if (status === 'pending') return <p className='loading'>Loading podcast...</p>;
  if (status === 'error') return <p className='error'>Error: {error.message}</p>;

  const description = podcast?.description || '';
  const words = description.split(' ');
  const truncatedDescription = words.slice(0, 50).join(' ');
  const hasMore = words.length > 50;

  const handleReadMoreToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSeason = (seasonIndex) => {
    setExpandedSeason(prev => (prev === seasonIndex ? null : seasonIndex));
  };

  console.log(podcast);

  return (
    <div className='podcast-data'>
      <div className='podcast-info'>
        <h2>{podcast?.title}</h2>
        <img src={podcast?.image} alt='Podcast Image' className='podcast-img' />
        <p>
          {isExpanded ? description : truncatedDescription}
          {hasMore && (
            <a href='#' onClick={handleReadMoreToggle}>
              {isExpanded ? '... Read less' : '... Read more'}
            </a>
          )}
        </p>
      </div>
      {podcast?.seasons && podcast.seasons.length > 0 && (
        <div className='podcast-seasons'>
          <h3>Seasons</h3>
          {podcast.seasons.map((season, index) => (
            <div key={index} className='season'>
              <h4 onClick={() => toggleSeason(index)} style={{ cursor: 'pointer' }}>
                Season {season.season} {expandedSeason === index ? '▼' : '▶'}
              </h4>
              {expandedSeason === index && season.episodes && season.episodes.length > 0 ? (
                <div className='episodes'>
                  {season.episodes.map((episode, episodeIndex) => (
                    <div key={episodeIndex} className='episode'>
                      {episode.title} — {episode.duration}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PodcastDetails;