import {
    GET_DOGS, SET_PAGE, GET_DOGS_BY_ID,
    GET_TEMPERAMENTS, SET_NAME
} from '../actions/index';

const initialState = {
    dogs: {result: []},
    dog: {},
    temperaments: [],
    name: "",
    order: "",
    page: 1
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: {
                    result: payload.result
                }
            }

            case GET_DOGS_BY_ID:
                console.log(payload)
                return {
                    ...state,
                    dog: payload
                }

            case GET_TEMPERAMENTS:
                return {
                    ...state,
                    temperaments: payload
                }

            case SET_PAGE:
                return {
                    ...state,
                    page: payload
                }

            case SET_NAME:
                return {
                    ...state,
                    name: payload
                }
        default:
            return state;
    }
}