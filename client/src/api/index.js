export const getUsers = async (pageNumber) =>{
    const limit = 5;
    const offset = pageNumber > 1? limit*(pageNumber-1): 0;
    const url = `http://localhost:5000/api/users?limit=${limit}&offset=${offset}`

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const createUser = async(userData) =>{
    const url = `http://localhost:5000/api/users`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    const resposne = await fetch(url,requestOptions);
    const data = await resposne.json();

    return data;
}

export const getGroups = async()=>{
    const url = `http://localhost:5000/api/groups`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}