import "./style.css";

//https://ws.audioscrobbler.com/2.0/?method=track.search&track=video+games&api_key=YOUR_API_KEY&format=json

/*
Application name    Music Recommendation
API key	c4f4cbe78d2187a1928264219a8a3bb6
Shared secret	0cb39cd4c438b9dabd5848b304b3f552
*/

const apiUrl = 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=video+games&api_key=c4f4cbe78d2187a1928264219a8a3bb6&format=json';

// Use fetch to make the API request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();  // Parse the JSON response
  })
  .then(data => {
    // Handle the data here
    console.log(data);  // Log the data or process it for display
    // You can access the track info in the data object, e.g., data.results.trackmatches.track
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });