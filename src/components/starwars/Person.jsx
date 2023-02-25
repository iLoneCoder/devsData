import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Person() {
    const { personId } = useParams();

    const [person, setPerson] = useState("");
    const [personKeys, setPersonKeys] = useState();
    const [isloading, setIsLoading] = useState(true);
    const [personFilms, setPersonFilms] = useState([]);

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
    }, [personId])


    const handleShowFilms = async () => {
        // try {
        const filmsArr = person.films;
        const promiseArr = [];
        // setPersonFilms([]);
        for (let filmUrl of filmsArr) {
            promiseArr.push(fetch(filmUrl)
            .then(result => result.json())

            );
        }
        Promise.all([...promiseArr])

            .then(results => {
                const newArr = results.map(el => el.title);
                // for (let film of results) {
                    
                // }
                setPersonFilms([...newArr])
            })
            .catch()

        //             for (let url of filmsArr) {
        //                 const response = await fetch(url);
        //                 const data = await response.json();
        // // if(!response.ok) {
        // //     throw new Error("")
        // // }
        //                 setPersonFilms(prevState => [...prevState, data.title]);
        //             }

        //         } catch (error) {

        //         }

    }

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

        <button onClick={handleShowFilms}>Show films</button>
        {personFilms.length > 0 ? <>
            <h2>Films:</h2>
            <ul>
                {personFilms.map((film, ind) => (
                    <li>
                        {film}
                    </li>
                ))}
            </ul>
        </> : <></>}
    </div>
}

export default Person;