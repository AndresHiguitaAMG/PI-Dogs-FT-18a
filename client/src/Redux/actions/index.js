import axios from 'axios';
export const GET_DOGS = 'GET_DOGS';
export const GET_DOGS_BY_ID = 'GET_DOGS_BY_ID';
export const SET_PAGE = 'SET_PAGE';
export const SET_NAME = "SET_NAME";
export const REMOVE_DOG = 'REMOVE_DOG';
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const POST_DOGS = "POST_DOGS";

export function getDogs({name, order, page}){
    return async function(dispatch){
            return await axios.get(`http://localhost:3001/dogs?page=${page ? page : 1}&order=${order ? order : ""}&name=${name ? name : ""}`)
            .then(apiData => {
                dispatch({
                    type: GET_DOGS,
                    payload: apiData.data
                });
                // console.log(apiData);
            })
        .catch((error) => {
            console.log(error)});
        }
    }

export function getDogsById(id){
    return async function(dispatch){
        try{
            const detail = await axios.get("http://localhost:3001/dogs/" + id)
            // console.log(detail);
            return dispatch({
                type: GET_DOGS_BY_ID,
                payload: detail.data
            });
        }catch(error){
            console.log(error);   
        }
    }
}

export function getTemperaments(){
    return async function(dispatch){
        try{
            const temp = await axios.get(`http://localhost:3001/temperaments`);
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temp.data
            })
        }catch(error){
            console.log(error);
        }
    }
}

export function postDogs(payload){
    return async function(dispatch){
        try{
            await axios.post(`http://localhost:3001/dogs/create`, payload);
            return dispatch({
                type: POST_DOGS
            })
        }catch(error){
            
        }
    }
}

export function setPage(page){
    return {
        type: SET_PAGE,
        payload: page
    }
}

export function setName(name){
    return {
        type: SET_NAME,
        payload: name
    }
}

export function removeDog(){
    return {
        type: REMOVE_DOG,
        payload: {}
    }
}

