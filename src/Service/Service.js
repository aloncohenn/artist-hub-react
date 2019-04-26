const formatQueryParams = (params) => {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join('&');
}

// Wikipedia Functions

const generateCapitalStringWiki = search => {
  let inputArray = search.split(' ');
  inputArray = inputArray.map(word => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });

  search = inputArray.join(' ');
  return search;
};

const disambiguationFetchWiki = (search) => {
    console.log('disambiguation ran');
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + search;

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        return {
          "image": responseJson.originalimage.source,
          "description": responseJson.extract
        }
      })
      .catch(error => console.log(error));
  };

export const fetchWiki = (search) => {
    console.log('fetchWiki ran');
    search = generateCapitalStringWiki(search);
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + search;
    
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        if (responseJson.type === 'disambiguation') {
          search += ' (musician)';
          return disambiguationFetchWiki(search);

        } else if (responseJson.coordinates) {
          search += ' (band)';
          return disambiguationFetchWiki(search);

        } else {
          return {
            "image": responseJson.originalimage.source,
            "description": responseJson.extract
          };
        }
      })
      .catch(error => {
        console.log(error);
        return error
      });
  };


// YouTube Functions

export const fetchYouTube = (search) => {
  const params = {
    part: 'snippet',
    maxResults: 6,
    q: search,
    type: 'video',
    key: "AIzaSyAWP2A6DGhGCUR15wfo2Y8HP0ij5mSIllA"
  };

  const searchYouTubeURL = 'https://www.googleapis.com/youtube/v3/search';
  const queryString = formatQueryParams(params);
  const url = searchYouTubeURL + '?' + queryString;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(responseJson => {
      if (responseJson['items'].length === 0) {
        console.log("no videos available")
      } else {
        return youTubeResults(responseJson);
      }
    })
    .catch(err => console.log(err));
}

const youTubeResults = (responseJson) => {
  console.log('youtube results runs')
  let results = responseJson['items'].map(element => {
    return {
      "title": element.snippet.title,
      "thumbnail": element.snippet.thumbnails.medium.url,
      "url": "http://youtube.com/watch?v=" + element.id.videoId
    }
  })

  return results
}

// Ticketmaster Functions

export const fetchTicketMaster = (search) => {
  const params = {
    keyword: search,
    size: 6,
    apikey: "GoG04vFo4immj2OMRsYDechobghqGcFw"
  };

  const ticketmasterURL = 'https://app.ticketmaster.com/discovery/v2/events';
  const queryString = formatQueryParams(params);
  const url = ticketmasterURL + '?' + queryString;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(responseJson => {
      if (responseJson._embedded === undefined) {
        throw new Error(responseJson.statusText);
      } else {
        return {
          events: displayTicketMaster(responseJson),
          socialMedia: displaySocialLinks(responseJson, search)
        }
      }
    })
    // .catch(renderTicketmasterError, renderSocialLinksError());
}

const displayTicketMaster = (responseJson) => {
  let results = responseJson._embedded.events.map(element => {
    return {
      "eventTitle": element.name,
      "image": element.images[0].url,
      "url": element.url,
      "city": element._embedded.venues[0].city.name,
      "country": element._embedded.venues[0].country.name
    }
  })
  
  return results
}

const displaySocialLinks = (responseJson, search) => {
  let target = checkAttractionsArray(responseJson, search); //confirms that the target has externalLinks and is the artist name
  return createSocialArrays(target); //creates and returns two arrays for links and the network names
}

const checkAttractionsArray = (responseJson, search) => {
  //Used when the event is a Music festival or has multiple artists
  let target = responseJson['_embedded'].events[0]['_embedded'].attractions; //looks at the array of objects for the event
  let inputArray = search.split(' ');
  inputArray = inputArray.map(word => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
  let inputName = inputArray.join(' ');
  for (let i = 0; i < target.length; i++) {
    if (target[i].externalLinks !== undefined && target[i].name === inputName) {
      //when there are external links and the name matches the inputVal
      target = target[i]; //declares that this is the correct object
    }
  }
  return target;
}

const createSocialArrays = (target) => {
  let results = [];
  for (let prop in target.externalLinks) {
    results.push({
      [prop]: target.externalLinks[prop][0].url
    })
  }

  return results
}