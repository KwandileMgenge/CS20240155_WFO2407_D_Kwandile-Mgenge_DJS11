// import { useQuery } from '@tanstack/react-query';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { getPodcastDetails } from '../PodcastData';
// import { useState } from 'react';
// import { genreList } from '../PodcastData';

// function PodcastDetails() {
//   const { podcastId } = useParams();
//   const [isExpanded, setIsExpanded] = useState(false);

//   const { status, error, data: podcast } = useQuery({
//     queryKey: [`podcast-data`, podcastId],
//     queryFn: () => getPodcastDetails(podcastId),
//   });

//   if (status === 'pending') return <p className='loading'>Loading podcast...</p>;
//   if (status === 'error') return <p className='error'>Error: {error.message}</p>;

//   const description = podcast?.description || '';
//   const words = description.split(' ');
//   const truncatedDescription = words.slice(0, 50).join(' ');
//   const hasMore = words.length > 50;

//   const handleReadMoreToggle = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className='podcast-data'>
//       <div className='podcast-info'>
//         <h2>{podcast?.title}</h2>
//         <img src={podcast?.image} alt='Podcast Image' className='podcast-img'/>
//         <div className='podcast-genre-list'>
//           {podcast.genres?.filter(genre => genre !== "All" && genre !== "Featured").map( (genre, index) => (
//             <h3 key={index}>
//               {genre}
//             </h3>
//           ))}
//         </div>
//         <p>
//           {isExpanded ? description : truncatedDescription}
//           {hasMore && (
//             <a href='#' onClick={handleReadMoreToggle} className='desc-link'>
//               {isExpanded ? ' ... Read less' : ' ... Read more'}
//             </a>
//           )}
//         </p>
//       </div>

//       {podcast?.seasons && podcast.seasons.length > 0 && (
//         <div className='podcast-seasons'>
//           <h3>Seasons</h3>
//           {podcast.seasons.map((season) => (
//             <div key={season.season} className='season'>
//               <Link to={`/previews/podcast/${podcastId}/season/${season.season}`} className='season-link'>
//                 <h4>Season {season.season}</h4>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PodcastDetails;

import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPodcastDetails, genreList } from '../PodcastData';
import { useState } from 'react';

function PodcastDetails() {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const { status, error, data: podcast } = useQuery({
    queryKey: [`podcast-data`, podcastId],
    queryFn: () => getPodcastDetails(podcastId),
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

  return (
    <div className='podcast-data'>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className='podcast-info'>
        <h2>{podcast?.title}</h2>
        <img src={podcast?.image} alt='Podcast' className='podcast-img'/>

        {/* Genre List */}
        <div className='podcast-genre-list'>
          {podcast.genres
            ?.filter(genreId => genreId !== "All" && genreId !== "Featured")
            .map((genreId, index) => (
              <h3 key={index}>{genreList[genreId]}</h3>
          ))}
        </div>

        {/* Description */}
        <p>
          {isExpanded ? description : truncatedDescription}
          {hasMore && (
            <a href='#' onClick={handleReadMoreToggle} className='desc-link'>
              {isExpanded ? ' ... Read less' : ' ... Read more'}
            </a>
          )}
        </p>
      </div>

      {/* Seasons */}
      {podcast?.seasons && podcast.seasons.length > 0 && (
        <div className='podcast-seasons'>
          <h3>Seasons</h3>
          {podcast.seasons.map((season) => (
            <div key={season.season} className='season'>
              <Link to={`/previews/podcast/${podcastId}/season/${season.season}`} className='season-link'>
                <h4>Season {season.season}</h4>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PodcastDetails;
