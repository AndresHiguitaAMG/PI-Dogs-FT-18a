import { React, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDogs, setName, setPage } from '../../Redux/actions';

function SearchBar() {
    const [input, setInput] = useState(""); //Input tiene el valor a mostrar
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setName(input)) //Guarda el input en el store
        dispatch(getDogs({page: 1, name: input})) //Y aquí hago la consulta como tal, pasandole el name y el input
        dispatch(setPage(1))
        setInput("")
    }
    return (
        <form>
            <input 
            type="text"
            placeholder="Search"
            onChange={handleOnChange}
            value={input}
            />
            <button
            type="submit"
            onClick={onSubmit}
            >🔍</button>
        </form>
    )
}

export default SearchBar;
