const formatQueryParams = params => {
    const queryItems = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join('&');
  };

// Wikipedia Functions

const disambiguationFetchWiki = search => {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + search;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => console.log(responseJson))
      .catch(error => console.log(error));
  };

const generateCapitalStringWiki = search => {
    let inputArray = search.split(' ');
    inputArray = inputArray.map(word => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });

    search = inputArray.join(' ');
    return search;
  };

export const fetchWiki = (search) => {
    search = generateCapitalStringWiki(search);
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + search;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        if (responseJson.type === 'disambiguation') {
          search += ' (musician)';
          disambiguationFetchWiki(search);
        }
        if (responseJson.coordinates) {
          search += ' (band)';
          disambiguationFetchWiki(search);
        }
        console.log(responseJson);
      })
      .catch(error => console.log(error));
  };

//YouTube Functions

// export const searchYouTube = (search) => {
//     const params = {
//         part: 'snippet',
//         maxResults: 6,
//         q: search,
//         type: 'video',
//         key: googleAPIKey
//     };

//     const searchYouTubeURL = 'https://www.googleapis.com/youtube/v3/search';
//     const queryString = formatQueryParams(params);
//     const url = searchYouTubeURL + '?' + queryString;

//     fetch(url)
//         .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new error(response.statusText);
//         }
//         })
//         .then(responseJson => {
//         if (responseJson['items'].length === 0) {
//             renderYouTubeError();
//         } else {
//             displayYouTube(responseJson);
//         }
//         })
//         .catch(renderYouTubeError);
// }