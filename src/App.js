import logo from './logo2.png';
import './App.css';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom'
import HomePage from './Home/Page'
import LikesPage from './Likes/Page'
import MapPage from './Map/Page'

const NavBarContainer = styled.div`
  background: #afe0bf;
  width: 25vw;
  min-width: 100px;
  img {
      width: 20vw;
      margin-top: 10px;
      padding: 5px;
      border: solid 3px;
  }
`

const NavItemStyle = styled.div`
  text-align: left;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
      background: #de6969;
      a {
          color: white;
      }
  }
  a {
    transition: 0.3s;
    display: block;
    padding: 15px 10px 15px 20px;
    text-decoration: none;
    color: red;
  }
`

const NavItem = ({path, title, icon}) =>
    <NavItemStyle>
        <Link to={path}><i className={`fas fa-${icon}`}></i> {title}</Link>
    </NavItemStyle>

NavItem.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

const NavBar = () =>
    <NavBarContainer>
        <img src={logo} alt="" />
        <NavItem path="/" title="Home" icon="home"/>
        <NavItem path="/map" title="Map" icon="map-signs"/>
        <NavItem path="/likes" title="Likes" icon="heart"/>
    </NavBarContainer>


const ContentContainer = styled.div`
  /* background: #6ea982; */
  display: flex;
  flex-grow: 1;
`

const Content = () =>
    <Switch>
        <ContentContainer>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route path="/map">
                <MapPage/>
            </Route>
            <Route path="/likes">
                <LikesPage/>
            </Route>
        </ContentContainer>
    </Switch>

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`


function App() {
    return (
        <AppContainer className="App">
            <Router>
                <NavBar/>
                <Content/>
            </Router>
        </AppContainer>
    );
}

export default App;
