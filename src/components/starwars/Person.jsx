import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Person() {
    const { personId } = useParams();

    const [person, setPerson] = useState("");
    const [personKeys, setPersonKeys] = useState();
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://swapi.dev/api/people/${personId}`);
            const data = await response.json();
console.log(personId)
            setPerson(data)
            setPersonKeys(Object.keys(data));
            // console.log(data.results[0])
            setIsLoading(false)
        }
        fetchData();
    }, [])

    if (isloading) {
        return
    }

    return <div className="person-info">
        <h1>{person.name}</h1>
        {personKeys.map((key, ind) => {
            if (key !== "name" && key !== "films" && key !== "species" && key !== "starships") {
                return <p key={ind}>{key}: {person[key]}</p>
            }
        })}
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
    </div>
}

export default Person;