import {useEffect, useState} from 'react';
import {Loader} from 'google-maps';
import styled from 'styled-components';
import mapStyle from './mapStyle';
import circleImg from './circle.svg';
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

const like = (title, pageid) => {
    console.log(title, pageid)
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
    const infowindow = new google.maps.InfoWindow();
    wikiData.forEach(({lat, lon, title, pageid}) => {
        const marker = new google.maps.Marker({
            position: {lat, lng: lon},
            map,
            title,
            icon: pinIcon,
        });
        const contentString = `
            <div>
                <h1>${title}</h1>
                <button onclick="like('${title}', '${pageid}')">Like</button>
            </div>
        `
        marker.addListener("click", () => {
            infowindow.setContent(contentString)
            infowindow.open(map, marker)
        })
    })
}

const getCurrentPosition = () => new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((p) => {
        const coords = {lat: p.coords.latitude, lng: p.coords.longitude}
        resolve(coords)
    })
})

const createMap = async () => {
    const google = await loader.load();
    const coords = await getCurrentPosition();
    const map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 12, //8
        styles: mapStyle,
    });
    await createMarkers(google, coords, map)
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
    const [map, setMap] = useState(null)
    useEffect(() => {
        window.like = like
        createMap().then(map => {
            setMap(map)
        })
    }, [])

    return (
        <MapContainer>
            <div id='map'></div>
        </MapContainer>
    )
}

export default MapPage

