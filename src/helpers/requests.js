export const getPeople = async (page) => {
    try {
        let response;
        if (page) {
            response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        } else {
            response = await fetch("https://swapi.dev/api/people");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        return [];
    }

}