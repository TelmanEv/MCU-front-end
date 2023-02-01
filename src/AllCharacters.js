import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './constants';
import axios from 'axios';

function AllCharacters() {
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/allCharacters`)
          .then(res => {
            const data = res.data;
    
            console.log(data);
    
            setServerData(data.payload);
          })
    }, [])

    return (  
        <ul>
            {serverData.length > 0 ? serverData.map((character) => 
                (
                <li key={character._id}>
                    <Link to={`/mcu/${character.name}`} >{character.name}</Link>
                </li>
                )
            ) : <h1>loading...</h1>}
        </ul>
    );
}

export default AllCharacters;