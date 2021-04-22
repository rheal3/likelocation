# LikeLocation

- [ ] Setup navigation (setup the react router and navigation bar https://reactrouter.com/)
Example:
http://preview.themeforest.net/item/roe-reactjs-admin-dashboard-template/full_screen_preview/23764691?_ga=2.76555861.1184397108.1618913666-1104986363.1618913600
- [ ]

## Dependancies
- Styled Components https://www.npmjs.com/package/styled-components

## tips for responsiveness
- always use rem for font size (calculates the size from a root element)
- always use percentages (e.g. %, vh, vw)



## getting articles from wikipedia
- [x] use axios to http requests (kind of like the fetchApi) https://github.com/axios/axios
- [x] use this query https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=37.7891838%7C-122.4033522&gsradius=10000&gslimit=100&format=json
- [x] passing the co-ords from getCurrentPosition into gscoord
- [x] filter out other data that doesn't relate to the markers (get each pageId, lat, lng, title), digging into the object that gets returned [].filter
- [x] [].forEach over article new google.maps.Marker
- [ ] Add on click to each marker to display the title and add a like button (when clicked just console.log('clicked'))
