import {useEffect, useState} from 'react';
import {Loader} from 'google-maps';
import styled from 'styled-components';
import mapStyle from './mapStyle';
import circleImg from './circle.svg';
import likedCircleImg from './likedCircle.svg';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';


const options = {};
const loader = new Loader('AIzaSyCsoZ_kZ2RwhNK_CTxddQMdl4rOXYFmLFo', options);

const selectLocationProperties = ({lat, lon, title, pageid}) => ({lat, lon, title, pageid})

const queryWiki = async (coords) => {
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
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve({title, pageid})
        }, 500)
    })
}

const locationSelectedAction = (title, pageid) => {
    return (dispatch) => {
        sendSelectedLocation(title, pageid).then((like) => {
            dispatch({type: 'likes/locationSelected', payload: like})
        })
    }
}

const _like = (dispatch, title, pageid) => {
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

const MapPage = () => {
    const allLikes = useSelector((state => state.likes.likes));
    const [map, setMap] = useState(null)
    const [google, setGoogle] = useState(null)
    const [coords, setCoords] = useState(null)
    const [markers, setMarkers] = useState(null)
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
                setMarkers(markers)
                markers.forEach(marker => {
                    const contentString = `
                    <div>
                        <h1>${marker.title}</h1>
                        <button onclick="like('${marker.title}', '${marker.pageid}')">Like</button>
                    </div>
                    `            
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

    const allAnothers = useSelector((state => state.another.another ));
    const viewAnothers = allAnothers.map(({hello}) =>
        <div>{hello}</div>
    )

    return (
        <MapContainer>
            <div id='map'></div>
        </MapContainer>
    )
}

export default MapPage

