import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPodcastDetails } from '../PodcastData';
import { useState, useEffect } from 'react';
import { genreList } from '../PodcastData';

function PodcastDetails() {
  const params = useParams();
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

  console.log(podcast);

  return (
    <div className='podcast-data'>
      <div className='podcast-info'>
        <h2>{podcast?.title}</h2>
        <img src={podcast?.image} alt='Podcast Image' className='podcast-img' />
        <p>
          {isExpanded ? description : truncatedDescription}
          {hasMore && (
            <a href='#' onClick={handleReadMoreToggle} className='desc-link'>
              {isExpanded ? ' ... Read less' : ' ... Read more'}
            </a>
          )}
        </p>
      </div>
      {podcast?.seasons && podcast.seasons.length > 0 && (
        <div className='podcast-seasons'>
          <h3>Seasons</h3>
          {podcast.seasons.map((season) => (
            <div key={season.season} className='season'>
              <Link to={`season-${season.season}`} className='season-link'>
                <h4>
                  Season {season.season}
                </h4>
              </Link>
              {/* {expandedSeason === index && season.episodes && season.episodes.length > 0 ? (
                <div className='episodes'>
                  <img src={season.image} alt="" className='preview-img'/>
                  {season.episodes.map((episode, episodeIndex) => (
                    <div key={episodeIndex} className='episode'>
                      {episode.title} — <audio src={episode.file} controls={true}></audio>
                    </div>
                  ))}
                </div>
              ) : null} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PodcastDetails;