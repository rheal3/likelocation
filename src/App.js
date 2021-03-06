import logo from './logo2.png';
import './App.css';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom'
import HomePage from './Home/Page'
import LikesPage from './Likes/Page'
import MapPage from './Map/Page'
import SingleLikePage from './SingleLike/Page'
import LoginPage from './Login/Page'
import SignUpPage from './SignUp/Page'
import { useDispatch } from 'react-redux'
import getLikes from './Likes/api'
import { useEffect } from 'react'
import { useRequireLogin } from './hooks'
import { useHistory } from 'react-router-dom';


const NavBarContainer = styled.div`
  background: #afe0bf;
  width: 25vw;
  /* min-width: 100px; */
  font-size: 19px;
  img {
      width: 21vw;
      margin: 10px 10px 0px 10px;
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


const NavBar = () => {
    const history = useHistory()
    const logout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }
    return (
        <NavBarContainer>
            <img src={logo} alt="" />
            <NavItem path="/" title="Home" icon="home"/>
            <NavItem path="/map" title="Map" icon="map-signs"/>
            <NavItem path="/likes" title="Likes" icon="heart"/>
            <button onClick={logout}>logout</button>
        </NavBarContainer>
    )
}


const ContentContainer = styled.div`
  /* background: #6ea982; */
  display: flex;
  flex-grow: 1;
`

const Content = () =>
    <Switch>
        <ContentContainer>
            <Route exact path="/" component={HomePage} />
            <Route path="/map" component={MapPage} />
            <Route exact path="/likes" component={LikesPage} />
            <Route path="/likes/:pageId" component={SingleLikePage} />
        </ContentContainer>
    </Switch>

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const setLikes = (likes) => ({type: 'likes/setLikes', payload: likes})

const getAllLikes = () => {
    return (dispatch) => {
        getLikes().then(likes => dispatch(setLikes(likes)))
    }
}

const ContentRoute = () => {
    useRequireLogin()
    return <>
        <NavBar/>
        <Content/>
    </>
}


function App() {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllLikes())
    })

    return (
        <AppContainer className="App">
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/" component={ContentRoute} />
                </Switch>
            </Router>
        </AppContainer>
    );
}

export default App;
