import {useEffect, useState} from 'react';
import {Loader} from 'google-maps';
import styled from 'styled-components';
import mapStyle from './mapStyle';
import circleImg from './circle.svg';
import axios from 'axios';

const options = {};
const loader = new Loader('AIzaSyCsoZ_kZ2RwhNK_CTxddQMdl4rOXYFmLFo', options);

const getCurrentPosition = () => new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((p) => {
        const coords = {lat: p.coords.latitude, lng: p.coords.longitude}
        resolve(coords)
    })
})

const queryWiki = async (coords) => {
    let url = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${coords.lat}%7C${coords.lng}&gsradius=10000&gslimit=100&format=json&origin=*`
    const config = {
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true }
    }
    const newObj = []

    await axios.get(url, {"Content-Type": "application/json"})
    .then(response => response.data.query.geosearch)
    .then(data => {
        data.filter(item => {
            const allowed = ['lat', 'lon', 'title', 'pageid'];
            const filtered = Object.keys(item)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = item[key];
                return obj;
            }, {})
            newObj.push(filtered);
        })
    })
    return newObj
}

const createMap = async () => {
    const google = await loader.load();
    const coords = await getCurrentPosition();
    const map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 8,
        styles: mapStyle,
    });
    const pinIcon = new google.maps.MarkerImage(
        circleImg,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(10, 10)
    );
    const wikiData = await queryWiki(coords)
    wikiData.forEach(item => {
        const marker = new google.maps.Marker({
            position: {lat: item.lat, lng: item.lon},
            map,
            title: item.title,
            icon: pinIcon,
        });
        const contentString = `<div><h1>${item.title}</h1><button onclick="function like(){console.log('Like Button Clicked!')};like()">Like</button></div>`
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });        
        marker.addListener("click", () => {
            infowindow.open(map, marker)
        })
    })
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

