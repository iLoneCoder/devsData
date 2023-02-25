import { createContext, useState } from "react";

const PeopleContext = createContext({
    people: [],
    pages: {
        next: "",
        prev: ""
    },
    setPeople: function (peopleArr) { },
    setPages: function (pages) { }
})

export function PeopleContextProvider({ children }) {
    const [peopleList, setPeopleList] = useState([]);
    const [pages, setPages] = useState({
        next: "",
        prev: ""
    })

    const setPeople = peopleArr => {
        setPeopleList(peopleArr);
    }

    const setPagesCont = pages => {
        setPages(pages)
    }

    const context = {
        people: peopleList,
        pages: pages,
        setPeople,
        setPages: setPagesCont
    }

    return <PeopleContext.Provider value={context}>
        {children}
    </PeopleContext.Provider>
}

export default PeopleContext;