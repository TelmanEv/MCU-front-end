import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCharacter() {
    const [name, setName] = useState("");
    const [debut, setDebut] = useState("");
    const [debutYear, setDebutYear] = useState(0);
    const navigate = useNavigate();
    async function postCharacter() {
        let newChar = {
            name: name,
            debut: debut,
            debutYear:debutYear
        }
        fetch("http://localhost:3001/api/createCharacter", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: {
                name: name,
                debut: debut,
                debutYear: debutYear
            }
        }).then(async res => {
            let serverResponse = res.json()
            //console.log(serverResponse)
            navigate(`/mcu/${serverResponse.payload.name}`);
        })
        setName("");
        setDebut("");
        setDebutYear(0);
    }
    function handleOnSubmit(event) {
        event.preventDefault();
        postCharacter();
    }
    return (
        <form onSubmit={(e) => handleOnSubmit(e)} >
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <br /><br />
            <label>Debut Film</label>
            <input value={debut} onChange={(e) => setDebut(e.target.value)} />
            <br /><br />
            <label>Debut Year</label>
            <input value={debutYear} onChange={(e) => setDebutYear(e.target.value)} />
            <br /><br />

            <button type='submit'>Submit</button>
        </form>
     );
}

export default CreateCharacter;