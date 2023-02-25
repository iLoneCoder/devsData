import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Person() {
    const { personId } = useParams();

    const [person, setPerson] = useState("");
    const [personKeys, setPersonKeys] = useState();
    const [isloading, setIsLoading] = useState(true);
    const [personFilms, setPersonFilms] = useState([]);
    const [pesronStarships, setPersonStarships] = useState([]);
    const [pesronSpecies, setPersonSpecies] = useState([]);

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


    const handleShow = async (state, setState, propName) => {
        // try {
        // const state = person.films;
        const promiseArr = [];
        // setPersonFilms([]);
        for (let filmUrl of state) {
            promiseArr.push(fetch(filmUrl)
                .then(result => result.json())

            );
        }
        Promise.all([...promiseArr])

            .then(results => {
                const newArr = results.map(el => el[propName]);
                // for (let film of results) {

                // }
                setState([...newArr])
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

    const handleShowFilms = async () => {
        await handleShow(person.films, setPersonFilms, "title");
    }

    const handleShowStarships = async () => {
        await handleShow(person.starships, setPersonStarships, "name");
    }

    const handleShowSpecies = async () => {
        await handleShow(person.species, setPersonSpecies, "name");
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
            return null;
        })}
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>

        <div className="additional-info">
            <div>
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

            <div>
                <button onClick={handleShowStarships}>Show starships</button>
                {pesronStarships.length > 0 ? <>
                    <h2>Starships:</h2>
                    <ul>
                        {pesronStarships.map(starship => (
                            <li>
                                {starship}
                            </li>
                        ))}
                    </ul>
                </> : <></>}
            </div>

            <div>
                <button onClick={handleShowSpecies}>Show species</button>
                {pesronSpecies.length > 0 ? <>
                    <h2>Species:</h2>
                    <ul>
                        {pesronSpecies.map(species => (
                            <li>
                                {species}
                            </li>
                        ))}
                    </ul>

                </> : <></>}
            </div>
        </div>


    </div>
}

export default Person;