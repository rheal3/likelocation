import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom'

const NavBarContainer = styled.div`
  background: #ffff00;
  width: 25vw;
  min-width: 100px;
`

const NavItemStyle = styled.div`
  padding: 20px;
`

const NavItem = ({path, title}) =>
    <NavItemStyle>
        <Link to={path}>{title}</Link>
    </NavItemStyle>

NavItem.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

const NavBar = () =>
    <NavBarContainer>
        <NavItem path="/" title="Home"/>
        <NavItem path="/map" title="Map"/>
        <NavItem path="/likes" title="Likes"/>
    </NavBarContainer>

const HomePage = () => <div> Home </div>
const MapPage = () => <div> Hello from Map page </div>
const LikesPage = () => <div> Hello from Likes page </div>

const ContentContainer = styled.div`
  background: #6ea982;
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
