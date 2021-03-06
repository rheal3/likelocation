import {useEffect, useState} from 'react';
import {Loader} from 'google-maps';
import styled from 'styled-components';
import mapStyle from './mapStyle';
import circleImg from './circle.svg';
import likedCircleImg from './likedCircle.svg';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import postLike from './api'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const options = {};
const loader = new Loader('AIzaSyCsoZ_kZ2RwhNK_CTxddQMdl4rOXYFmLFo', options);
// const loader = new Loader(process.env.REACT_APP_GOOGLE_API_KEY, options);

const selectLocationProperties = ({lat, lon, title, pageid}) => ({lat, lon, title, pageid})

export const queryWiki = async (coords) => {
    return await axios.get("https://en.wikipedia.org/w/api.php", {
        "Content-Type": "application/json",
        params: {
            action: 'query',
            list: 'geosearch',
            gscoord: `${coords.lat}|${coords.lng}`,
            gsradius: 10000,
            gslimit: 100,
            format: 'json',
            origin: '*'
        }
    })
        .then(response => response.data.query.geosearch)
        .then(locations => locations.map(selectLocationProperties))
}

const sendSelectedLocation = (title, pageid) => {
    return new Promise((resolve) => {
        postLike({title, pageid})
        resolve({title, pageid})
    })
}

const setLikeLoading = () => ({type: 'likes/loading'})
const selectLocation = (like) => ({type: 'likes/locationSelected', payload: like})

const locationSelectedAction = (title, pageid) => {
    return (dispatch) => {
        dispatch(setLikeLoading())
        sendSelectedLocation(title, pageid).then((like) => {
            dispatch(selectLocation(like))
        })
    }
}

const notify = () => {
    toast.success("added to likes..", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
};

const _like = (dispatch, title, pageid) => {
    notify()
    dispatch(locationSelectedAction(title, pageid))
}

const createMarkers = async (google, coords, map) => {
    const pinIcon = new google.maps.MarkerImage(
        circleImg,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(10, 10)
    );
    const wikiData = await queryWiki(coords)
    const markerArray = [];
    wikiData.forEach(({lat, lon, title, pageid}) => {
        const marker = new google.maps.Marker({
            position: {lat, lng: lon},
            map,
            title,
            icon: pinIcon,
            pageid,
        });
        markerArray.push(marker)
    })
    return markerArray
}

const getCurrentPosition = () => new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((p) => {
        const coords = {lat: p.coords.latitude, lng: p.coords.longitude}
        resolve(coords)
    })
})

const createMap = async (google) => {
    const coords = await getCurrentPosition();
    const map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 12, //8
        styles: mapStyle,
    });
    // await createMarkers(google, coords, map)
    return map
}

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  #map {
    height: 100%;
    width: 100%;
  }
`
const infoWindowId = "infowindow"
const infoWindowContent = (title, pageid) => {
    return `
            <div id="${infoWindowId}">
                <h1>${title}</h1>
                <button onclick="like('${title}', '${pageid}')">Like</button> 
            </div>
`
}


const MapPage = () => {
    const allLikes = useSelector((state => state.likes.likes));
    const [map, setMap] = useState(null)
    const [google, setGoogle] = useState(null)
    const [coords, setCoords] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        loader.load().then(google => {
            createMap(google).then(map => {
                setMap(map)
            })
            setGoogle(google)
        });
        getCurrentPosition().then(coords => setCoords(coords));
        window['like'] = _like.bind(null, dispatch)
    }, [])

    useEffect(() => {
        if (google && coords && map) {
            createMarkers(google, coords, map).then(markers => {
                markers.forEach(marker => {
                    const {pageid, title} = marker
                    const contentString = infoWindowContent(title, pageid, false)
                    marker.addListener("click", () => {
                        let currentInfoWindow = window.infoWindow
                        if (!currentInfoWindow) {
                            currentInfoWindow = new google.maps.InfoWindow();
                            window.infoWindow = currentInfoWindow
                        }
                        currentInfoWindow.close()
                        currentInfoWindow.setContent(contentString)
                        currentInfoWindow.open(map, marker)
                    })
                    allLikes.forEach(({pageid}) => {
                        if (marker['pageid'] === Number(pageid)) {
                            marker['icon']['url'] = likedCircleImg
                        }
                    })
                })
            })
        }
    }, [google, coords, map, allLikes])

    return (
        <MapContainer>
            <div id='map'></div>
            <ToastContainer />
        </MapContainer>
    )
}

export default MapPage

