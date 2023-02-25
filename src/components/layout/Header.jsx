import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PeopleContext from "../../store/People";

function Header() {
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const { setPeople, setPages } = useContext(PeopleContext);
    const handleSearch = async () => {
        console.log(name);
        if (name) {
            const response = await fetch(`https://swapi.dev/api/people?search=${name}`);
            const data = await response.json();
            setPeople(data.results);
            setPages({
                next: "",
                prev: ""
            })
            navigate("/");
        }
    }

    return <header className="header">
        <div className="logo">
            Star wars
        </div>

        <div className="search-bar">
            <label htmlFor="people">People</label>
            <input type="text" id="people" name="people" className="form-control" value={name} onChange={e => setName(e.target.value)} />
            <button className="btn" onClick={handleSearch}>Search</button>
        </div>
    </header>
}

export default Header;