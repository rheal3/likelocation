# LikeLocation

- [x] Setup navigation (setup the react router and navigation bar https://reactrouter.com/)
Example:
http://preview.themeforest.net/item/roe-reactjs-admin-dashboard-template/full_screen_preview/23764691?_ga=2.76555861.1184397108.1618913666-1104986363.1618913600

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
- [x] Add on click to each marker to display the title and add a like button (when clicked just console.log('clicked'))

## Populate the likes page (http://localhost:3000/likes)
- [x] Create a simple (or complex) list view
    - visit themeforest for inspiration
- [ ] get the likes from the store (hint: use useSelector) inside the page
  - checkout how lists are rendered in react https://reactjs.org/docs/lists-and-keys.html
  - use the pageid as the key
  - what are keys used for in React and why are they important?
- [x] add the ability to remove a like
- [x] create a hyperlink to the wikipedia article when you click it

## create and route to a LikeViewPage
- [x] create a new page component (probably in a separate directory) (hint: use the same selector as for the allLikes value in the MapPage)
- [x] create a route with path "/like/:pageid" (no sidebar link needed)
- [x] set the title
- [x] set the article body (hint: query filters the wikipedia api to get clean content)
- [x] set any image from the article
- [x] add button "view full article" (hint: use an anchor, style it as a button)

## add production ready refinements
- [x] https://testing-library.com/docs/react-testing-library (completely optional because it's F'd)
- [x] create a 'npm run lint' command script
  - What a linter is, why is it important?
    - A Static analysis tool to assess non-functional code quality requirements
    - Enforces consistency
    - Can unexpected bugs
    - checks syntax
- [x] Setup circleci for our project https://circleci.com/ (setup a configuration and show it working in the dashboard)
  - What is continuous integration (CI)
      - CI is a set of practices which allow multiple developers to push code to single codebase
        - Pushing smaller chunks (in git chunks are commits)
        - Code reviews before merging into the (in git this is normally the master branch)
        - Blocking merges via a CI pipeline
  - What is a CI pipeline?
    - The automated system that assess codebase (for things like code quality, security, functional requirements)
  - What goes in a CI pipeline?
    - Runs tests
    - checks codecoverage
    - Builds code
    - Runs static analysis (linting, complexity analysis)
    - Check licenses for open software
    - Check to see if dependencies are out of date
    - Make database changes
    - Use it to deploy to different environments (dev, staging, prod)
    - Can notify things like slack if pipelines fail
  - Have circleci run the tests and run lint
    
## Functional programming
- [x] revisit HoFs
  - any function, that takes a function as a parameter or returns a function
- [x] what is a Referential Transparency? (and how is that different to a Pure Function)
  - An expression that can be replaced by the body of the function without changing the end result (the programs behavior)
- [x] what is recursion? (what problems are recursive by nature?)
  - Use when traversing a tree
  - When you need to save the result

## CI practises
- [ ] Code reviews
- [ ] Pull requests
- [ ] Extending the pipeline

## Look for things to harden up the frontend
- [ ] look at how to configure robots.txt
- [x] more unit tests
- [x] get coverage working on the frontend https://create-react-app.dev/docs/running-tests/
  - `npm test -- --coverage --watchAll=false`
- [ ] More robust error messaging (probably look at using a Toast)
- [ ] adding an actual logging library (look at using Rollbar)