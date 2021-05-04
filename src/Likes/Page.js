import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const getWikiPageUrls =  (allLikes) => new Promise ((resolve, reject) => {
    const pageIds = allLikes.map(like => like.pageid).join('|')
    if (!pageIds) {
        reject(console.log('no liked locations'))
    } else {
        try {
            axios.get("https://en.wikipedia.org/w/api.php", {
                "Content-Type": "application/json",
                params: {
                    action: 'query',
                    prop: 'info',
                    pageids: pageIds,
                    inprop: 'url',
                    format: 'json',
                    origin: '*'
                }
            }).then(response => resolve(response.data.query.pages))
        } catch (err) {
            console.log(err.message)
        }
    }
})

const insertData = (allLikes, dispatch, allUrls) => {
    if (allLikes && allUrls) {
        const tableData = allLikes.map(location => {
            let link = `/likes/${location.pageid}`
            let url = allUrls[location.pageid].fullurl
            return (
                <ul className="nested">
                    <li key={location.pageid}>
                        <Link to={{
                        pathname: link, 
                        locationProps: {
                            name: location.title,
                            url
                            }
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
  }
  .nested li {
    text-align: center;
    padding: 5px 20px;
    margin: 12px;
  }
`

const LikesPage = () => {
    const [allUrls, setAllUrls] = useState(null)
    const allLikes = useSelector((state => state.likes.likes));
    const dispatch = useDispatch()
    useEffect(() => {
        getWikiPageUrls(allLikes).then(response => setAllUrls(response))
    }, [allLikes])
    return (
        <LikesContainer> 
            <h1>Liked Locations</h1>
            <div>
                <ul>
                    {insertData(allLikes, dispatch, allUrls)}
                </ul>
            </div>
        </LikesContainer>
    )
}

export default LikesPage