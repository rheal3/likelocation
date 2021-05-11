import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import emptyStateIllustration from './emptyStateIllustration.png'

const LikedLocationList = ({allLikes, dispatch}) => {
    if (allLikes) {
        const tableData = allLikes.map(location => {
            let link = `/likes/${location.pageid}`
            return (
                <ul className="nested" key={location.pageid}>
                    <li key={`${location.page}-title`}>
                        <Link to={{
                            pathname: link, 
                        }}>{location.title}</Link>
                    </li>
                    <li key={`${location.pageid}-trash`}>
                        <i className="fas fa-trash-alt" 
                            style={{cursor: 'pointer'}} //TODO - put in styled component :) 
                            onClick={() => {removeLikedLocation(dispatch, location.pageid)}}>
                        </i>
                    </li>
                </ul>
            )
        })
        return tableData
    }
}

const EmptyLikesContainer = styled.div`
img {
    width: 400px;
    height: 400px;
}
`

const EmptyLikesComponent = () => {
    return (
        <Link to="/map">
            <EmptyLikesContainer>
                <img src={emptyStateIllustration} alt="you have no likes"/>
                <h2>you don&apos;t have any likes :(</h2>
                <p>click here to add likes</p>
            </EmptyLikesContainer>
        </Link>
    )
}

const removeLocation = (like) => ({type: 'likes/locationRemoved', payload: like})

const removeLikedLocation = (dispatch, pageid) => {
    dispatch(removeLocation(pageid))
}

const LikesContainer = styled.div`
  overflow-y: auto;
  font-family: Roboto;
  width: 90%;
  margin: 30px auto;
  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  ul.nested {
    background: #e2eaf4;
  }
  .nested {
    display: flex;
    place-content: space-between;
    padding: 5px 10px;
    margin: 10px;
  }
  .nested li:first-child {
    font-size: 19px;
    color: #ff0000;
  }
  .nested li {
    text-align: center;
    padding: 5px 20px;
    margin: 12px;
  }
`

const LikesPage = () => {
    const likeSelector = state => {
        return state.likes.likes
    }
    const allLikes = useSelector(likeSelector);
    const dispatch = useDispatch()
    return (
        <LikesContainer> 
            <h1 id='liked-locations-heading'>Liked Locations</h1>
            {allLikes.length > 0 ? <LikedLocationList allLikes={allLikes} dispatch={dispatch}/> : <EmptyLikesComponent/>}
        </LikesContainer>
    )
}

export default LikesPage