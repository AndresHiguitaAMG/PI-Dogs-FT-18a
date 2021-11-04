import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getTemperaments, postDogs } from '../../Redux/actions';

function Form() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const history = useHistory();
    const [input, setInput] = useState({
        name: "",
        max_height: "",
        min_height: "",
        max_weight: "",
        min_weight: "",
        life_span: "",
        temperaments: []
    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(postDogs(input))
        alert("Successfully created dog breed.")
        setInput({
        name: "",
        max_height: "",
        min_height: "",
        max_weight: "",
        min_weight: "",
        life_span: "",
        temperaments: []
        })
        history.push('/home')
    }

    const handleOnChange = (e) => {
        //seteo el input
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        const select = input.temperaments.find(el => el === e.target.value)
        if(select) return
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }
    return (
        <div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleOnChange(e)}
                    />

                    <div>
                        <label>Max Height: </label>
                        <input
                        type="number"
                        value={input.max_height}
                        name="max_height"
                        onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div>
                        <label>Min Height: </label>
                        <input
                        type="number"
                        value={input.min_height}
                        name="min_height"
                        onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div>
                    <label>Max Weight: </label>
                    <input
                    type="number"
                    value={input.max_weight}
                    name="max_weight"
                    onChange={(e) => handleOnChange(e)}
                    />
                    </div>

                    <div>
                    <label>Min Weight: </label>
                    <input
                    type="number"
                    value={input.min_weight}
                    name="min_weight"
                    onChange={(e) => handleOnChange(e)}
                    />
                    </div>

                    <div>
                        <label>Years of life: </label>
                        <input
                        type="number"
                        value={input.life_span}
                        name="life_span"
                        onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div>
                        <select onChange={(e) => handleSelect(e)}>
                        <option value="">-- Select Temperaments --</option>
                        {temperaments.map(el => (
                            <option value={el}>{el}</option>))}
                        </select>

                        <ul>
                            <li>{input.temperaments.map(el => el + ", ")}</li>
                        </ul>
                    </div>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Form;
