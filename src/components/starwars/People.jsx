import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getPeople } from "../../helpers/requests";
import PeopleContext from "../../store/People";
import Card from "../utils/card";

function People() {
    const navigate = useNavigate();
    const { people, pages, setPeople, setPages } = useContext(PeopleContext)
    // const [people, setPeople] = useState();
    // const [pages, setPages] = useState({
    //     next: "",
    //     prev: ""
    // });
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    useEffect(() => {
        const fetchData = async () => {

            const data = await getPeople(page);
            setPeople(data);
            setPages({next: "", prev: ""});
            setPeople(data.results);
            // console.log(data.previous);

            let nextPage = "";
            let prevPage = "";
            if (data.next) {
                const arr = data.next.split("=");
                nextPage = arr[arr.length - 1];
            }

            if (data.previous) {
                const arr = data.previous.split("=");

                prevPage = arr[arr.length - 1];
            }

            const tempPages = {
                next: nextPage,
                prev: prevPage
            }
            console.log(tempPages)
            setPages(tempPages);

            setIsLoading(false);

        }
        fetchData();
    }, [page])

    const handleNextPageChange = () => {
        navigate(`/?page=${pages.next}`);
    }

    const handlePrevPageChange = () => {
        navigate(`/?page=${pages.prev}`);
    }

    if (isLoading) {
        return
    }
    return <>
        <div className="people">
            {people.map((person, ind) => <Card key={ind} person={person} />)}

        </div>
        {pages.prev && <button onClick={handlePrevPageChange} >Prev page</button>}
        {pages.next && <button onClick={handleNextPageChange}>Next page</button>}
    </>


}

export default People;