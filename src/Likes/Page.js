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
                // TODO display nested in single row (no bullets) (styled component)
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
                    <li key="{location.pageid}-trash">
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
  font-family: Roboto;
  width: 100%;
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
            <h1>title - likes page</h1>
            <div>
                <ul>
                    {insertData(allLikes, dispatch, allUrls)}
                </ul>
            </div>
        </LikesContainer>
    )
}

export default LikesPage