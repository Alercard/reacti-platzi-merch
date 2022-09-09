import { useState, useEffect } from 'react';
import axios from 'axios';

const useGoogleAddress = (address) => {
    const [ map, setMap ] = useState({lat: 0, lng: 0});
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCOOdvDv1LJ4qULvDtID0_rwslUOWLx2_I`;

    useEffect(async () => {
        const response = await axios(API);
        console.log('response google API:', response)
        if (response.data && response.data.results && response.data.results.length > 0) {
            setMap(response.data.results[0].geometry.location)
        }
    }, []);
    console.log('map response:', map);
    return map;
}

export { useGoogleAddress }
