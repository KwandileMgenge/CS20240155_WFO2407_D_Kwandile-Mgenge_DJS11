// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getPodcastDetails } from '../PodcastData';

// function SeasonDetails() {
//   const { podcastId, seasonId} = useParams();

//   const { data: podcast, status, error } = useQuery({
//     queryKey: ['podcast-data', podcastId],
//     queryFn: () => getPodcastDetails(podcastId),
//   });

//   if (status === 'pending') return <p>Loading season...</p>;
//   if (status === 'error') return <p>Error: {error.message}</p>;

//   const season = podcast?.seasons.find(s => s.season.toString() === seasonId);

//   if (!season) {
//     return <p>Season not found</p>;
//   }

//   return (
//     <div className='season-episodes'>
//       <h2>Season {season.season} {season.title === `Season ${season.season}` ? '' : `- ${season.title}`}</h2>
//       <img src={season.image} alt={`Season ${season.season}`} className='season-img'/>
//       {season.episodes.map((episode, index) => (
//         <div key={index}>
//           <h4>{episode.title}</h4>
//           <audio src={episode.file} controls className="custom-audio"/>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SeasonDetails;

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPodcastDetails } from '../PodcastData';

function SeasonDetails() {
  const { podcastId, seasonId } = useParams();
  const navigate = useNavigate();

  const { data: podcast, status, error } = useQuery({
    queryKey: ['podcast-data', podcastId],
    queryFn: () => getPodcastDetails(podcastId),
  });

  if (status === 'pending') return <p>Loading season...</p>;
  if (status === 'error') return <p>Error: {error.message}</p>;

  const seasons = podcast?.seasons || [];
  const season = seasons.find(s => s.season.toString() === seasonId);

  if (!season) {
    return <p>Season not found</p>;
  }

  // Handle season change
  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    navigate(`/previews/podcast/${podcastId}/season/${selectedSeason}`);
  };

  return (
    <div className='season-episodes'>
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className='filters'>
        <select id="season-select" value={seasonId} onChange={handleSeasonChange}>
        {seasons.map(s => (
          <option key={s.season} value={s.season}>
            Season {s.season} {s.title !== `Season ${s.season}` ? `- ${s.title}` : ''}
          </option>
        ))}
      </select>
      </div>

      {/* <h2>Season {season.season} {season.title !== `Season ${season.season}` ? `- ${season.title}` : ''}</h2> */}
      <img src={season.image} alt={`Season ${season.season}`} className='season-img' />

      {season.episodes.map((episode, index) => (
        <div key={index}>
          <h4>{episode.title}</h4>
          <audio src={episode.file} controls className="custom-audio" />
        </div>
      ))}
    </div>
  );
}

export default SeasonDetails;
