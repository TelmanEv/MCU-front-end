import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OneCharacter() {
    const { name } = useParams();

    const navigate = useNavigate();
    const [character, setCharacter] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [debutInput, setDebutInput] = useState("");
    const [debutYearInput, setDebutYearInput] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/getCharacterByName/${name}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            }
        })
            .then(async res => {
                let result = await res.json()
                setCharacter(result.payload)
                setDebutInput(result.payload.debut)
                setDebutYearInput(result.payload.debutYear)
            })
    }, [name, isEditing])

    function toggleEditing(){
        isEditing ? setIsEditing(false) : setIsEditing(true)
    }

    function handleOnSubmit(e){
        e.preventDefault();

        console.log("Submitted!");

        let sendBody = {
            debut: debutInput,
            debutYear: debutYearInput
        }

        fetch(`${API_URL}/updateCharacter/${character._id}`, {
            method: "put",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify(sendBody)
        }).then(() => {
            setIsEditing(false);
        })
    }
    function handleDelete() {
        fetch(`${API_URL}/deleteCharacter/${character._id}`, {
            method: "delete",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            }
        }).then(() => {
            navigate("/mcu");
    })
}
    return (  
        <>
            <h1>The character {character.name}</h1>
            <ul>
                <form onSubmit={handleOnSubmit}>
                <li>
                    debuted in &nbsp;
                    {isEditing ? 
                    <input type="text" name="debut" value={debutInput} onChange={(e) => setDebutInput(e.target.value)}/> :
                    <span>{character.debut}</span> 
                    }
                    .
                </li>
                <li>
                    This was released in &nbsp;
                    {isEditing ? 
                    <input type="text" name="debutYear" value={debutYearInput} onChange={(e) => setDebutYearInput(e.target.value)}/> :
                    <span>{character.debutYear}</span> 
                    }
                    .
                </li>
                {isEditing ? <button type="submit">Submit edit</button> : <br />}
                </form>
            </ul>
            <button onClick={toggleEditing} >
                {isEditing ? 
                    "Stop editing" :
                    "Edit character details"
                }
            </button>
            <button onClick={handleDelete}>Delete This Character</button>
        </>
    );
}

export default OneCharacter;
