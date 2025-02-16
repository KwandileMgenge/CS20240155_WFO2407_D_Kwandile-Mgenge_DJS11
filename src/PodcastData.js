const Base_URL = 'https://podcast-api.netlify.app';

export const genreList = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

export async function getPodcastPreviews() {
  const response = await fetch(`${Base_URL}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function getPodcastDetails(id) {
  const response = await fetch(`${Base_URL}/id/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function getGenre(id) {
  const response = await fetch(`${Base_URL}/genre/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}