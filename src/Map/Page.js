import { useEffect, useState } from 'react';
import { Loader } from 'google-maps';
import styled from 'styled-components';
import mapStyle from './mapStyle';

const options = {};
const loader = new Loader('AIzaSyCsoZ_kZ2RwhNK_CTxddQMdl4rOXYFmLFo', options);

const getCurrentPosition = () => {
    return new Promise((resolve) => {
        const position = navigator.geolocation.getCurrentPosition((p) => {
            const coords = {lat: p.coords.latitude, lng: p.coords.longitude}
            resolve(coords)
        })
    })
}
 
const createMap = async () => {
    const google = await loader.load();
    const coords = await getCurrentPosition();
    const map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 8,
        styles: mapStyle,
    });
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

