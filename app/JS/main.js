import "../CSS/style.css";

//https://ws.audioscrobbler.com/2.0/?method=track.search&track=video+games&api_key=YOUR_API_KEY&format=json

/*
Application name    Music Recommendation
API key	c4f4cbe78d2187a1928264219a8a3bb6
Shared secret	0cb39cd4c438b9dabd5848b304b3f552
*/

const apiUrl =
  "https://ws.audioscrobbler.com/2.0/?method=track.search&track=video+games&api_key=c4f4cbe78d2187a1928264219a8a3bb6&format=json";

// Use fetch to make the API request
/*fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse the JSON response
  })
  .then((data) => {
    // Handle the data here
    console.log(data); // Log the data or process it for display
    // You can access the track info in the data object, e.g., data.results.trackmatches.track
    console.log(data.results);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });*/

const apiKey = "c4f4cbe78d2187a1928264219a8a3bb6";
const baseUrl = "http://ws.audioscrobbler.com/2.0/";
const DOMSelectors = {};

function searchTrack(trackName) {
  const url = `${baseUrl}?method=track.search&track=${encodeURIComponent(
    trackName
  )}&api_key=${apiKey}&format=json`;

  fetch(url)
    .then((response) => response.json()) // Convert the response to JSON
    .then((data) => {
      if (data.results && data.results.trackmatches) {
        const tracks = data.results.trackmatches.track;
        if (tracks.length > 0) {
          tracks.forEach((track) => {
            console.log(`Track: ${track.name}`);
            console.log(`Artist: ${track.artist}`);
            console.log(`Album: ${track.album ? track.album : "N/A"}`);
            console.log(`URL: ${track.url}`);
            console.log(
              `Duration: ${
                track.duration ? track.duration / 1000 : "N/A" //duration is in milliseconds
              } seconds`
            );
            console.log(
              `Tags: ${
                track.toptags
                  ? track.toptags.tag.map((tag) => tag.name).join(", ")
                  : "N/A"
              }`
            );
            console.log("---");
          });
        } else {
          console.log(`No results found for "${trackName}".`);
        }
      } else {
        console.log("Error retrieving data from Last.fm API");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

searchTrack("Video Games");

/*track.getSimilar
 */
