import "../CSS/style.css";

/*
API key	c4f4cbe78d2187a1928264219a8a3bb6
Shared secret	0cb39cd4c438b9dabd5848b304b3f552

API Docs

*/

const apiUrl =
  "https://ws.audioscrobbler.com/2.0/?method=track.search&track=video+games&api_key=c4f4cbe78d2187a1928264219a8a3bb6&format=json";
const apiKey = "c4f4cbe78d2187a1928264219a8a3bb6";
const siteUrl = "http://ws.audioscrobbler.com/2.0/";                  //static, doesn't need to go in the DOMSelector
const DOMSelectors = {
  form: document.getElementById("form"),
  searchButton: document.getElementById("searchButton"),
  container: document.getElementById("container"),
};

DOMSelectors.searchButton.addEventListener("click", function () {
  let songName = DOMSelectors.form.value;
  DOMSelectors.form.value = "";
  search(songName);
});

async function search(track) {
  try {
    const URL = `${siteUrl}?method=track.search&track=${encodeURIComponent(
      //to allow special characters and spaces without breaking the link
      track
    )}&api_key=${apiKey}&format=json`;
    const response = await fetch(URL);
    const data = await response.json();
    const tracks = data.results.trackmatches.track;
    console.log(data);
    createCards(tracks);
  } catch (error) {
    console.log(error);
  }
}

async function findImageLink(track, artistName) {
  try {
    const URL = `${siteUrl}?method=track.getInfo&artist=${encodeURIComponent(
      artistName
    )}&track=${encodeURIComponent(track.name)}&api_key=${apiKey}&format=json`;
    const response = await fetch(URL);
    const data = await response.json();
    if (data.track.album && data.track.album.image[3]["#text"]) {         //if track has an album and has an album image (entry 4 in the image array is extra large)
      //console.log("has album image");
      return `<img src="${data.track.album.image[3]["#text"]}" alt="album cover`;   //text property is the url of the image
    } else {
      //console.log("no album image");
      return '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU8u8tpVE9yl1Jj0L81O7deRDfyW-yOXX-Kw&s" alt = "no album cover found">';
    }
  } catch {
    console.log("error in album search");
  }
}

async function createCards(tracks) {
  DOMSelectors.container.innerHTML = "";
  if (tracks.length > 0) {
    for (const track of tracks) {
      //forEach doesn't work with asynchronous functions
      console.log("tracks:", track);
      const artist = track.artist;
      const imageHTML = await findImageLink(track, artist);
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="card"> 
        ${imageHTML} 
        <p class="cardText"> ${track.name} </p>
        <p class="cardText"> ${artist} </p>
        <button class="selectButton" id="${track.url}">Find Similar Songs</button>
        </div>`
      );
      addButtonListener(track, artist);
    }
  } else {
    DOMSelectors.container.insertAdjacentHTML(
      "afterbegin",
      `<p class="noResultsText"> No results found </p>`
    );
  }
}

function addButtonListener(track, artist) {
  const button = document.getElementById(track.url);
  button.addEventListener("click", function () {
    returnSimilar(track, artist);
  });
}

async function returnSimilar(track, artist) {
  try {
    const URL = `${siteUrl}?method=track.getsimilar&artist=${encodeURIComponent(
      artist
    )}&track=${encodeURIComponent(track.name)}&api_key=${apiKey}&format=json`;
    const response = await fetch(URL);
    const data = await response.json();
    const tracks = data.similartracks.track;
    similarCards(tracks);
  } catch (error) {
    console.log(error);
  }
}

//probably excessive function, but the api data for getsimilar and searchtrack seems to be in a different format (track.artist.name instead of track.artist)

async function similarCards(tracks) {
  DOMSelectors.container.innerHTML = "";
  //const track.getInfo, album.info use album.info to get image url
  //DOMSelectors.container.innerHTML('');
  if (tracks.length > 0) {
    for (const track of tracks) {
      const artist = track.artist.name;
      const imageHTML = await findImageLink(track, artist)
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="card">
        ${imageHTML}
        <p class="cardText"> ${track.name} </p>
        <p class="cardText"> ${track.artist.name} </p>
        <button class="selectButton" id="${track.url}">Find Similar Songs</button>
        </div>`
      );
      addButtonListener(track, artist);
    }
  } else {
    DOMSelectors.container.insertAdjacentHTML(
      "afterbegin",
      `<p class="noResultsText"> No results found </p>`
    );
  }
}