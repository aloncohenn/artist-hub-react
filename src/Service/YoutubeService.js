const googleAPIKey = 'AIzaSyAWP2A6DGhGCUR15wfo2Y8HP0ij5mSIllA';

const formatQueryParams = params => {
    const queryItems = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join('&');
  };

function searchYouTube(inputVal) {
    const params = {
      part: 'snippet',
      maxResults: 6,
      q: inputVal,
      type: 'video',
      key: googleAPIKey
    };
  
    const searchYouTubeURL = 'https://www.googleapis.com/youtube/v3/search';
    const queryString = formatQueryParams(params);
    const url = searchYouTubeURL + '?' + queryString;
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new error(response.statusText);
        }
      })
      .then(responseJson => {
        if (responseJson['items'].length === 0) {
          renderYouTubeError();
        } else {
            displayYouTube(responseJson);
        }
      })
      .catch(renderYouTubeError);
  }