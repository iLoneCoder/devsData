import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Card({ person }) {
    const [personId, setPersonId] = useState();
    const { name, height, mass, url } = person;
    // console.log(props)

    useEffect(() => {
        const urlArr = url.split("/");
        const id = urlArr[urlArr.length - 2];
        setPersonId(id);
    }, [url])
    const handleClick = (e) => {

    }
    return <div className="card">
        <div className="card-body">
            <p>{name}</p>
            <p>Height: {height}</p>
            <p>Mass: {mass}</p>
        </div>

        <div className="details" >
            <Link to={`/person/${personId}`}>Details</Link>
        </div>
    </div>
}

export default Card;