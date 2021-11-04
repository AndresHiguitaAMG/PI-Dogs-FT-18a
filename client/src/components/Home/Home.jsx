import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, setPage } from '../../Redux/actions';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';

const Home = () => {
    const dispatch = useDispatch();
    const { dogs, name, page, order } = useSelector(state => state);

    useEffect(() => {
        dispatch(getDogs({}));
    }, [dispatch]);

    const handleClickPage = (page) => {
        dispatch(getDogs({ page, name, order }));
        dispatch(setPage(page));
    }

    const handleonClickLoad = (e) => {
        e.preventDefault(); //Evita que se recargue la pagina y se rompa
        dispatch(getDogs({ page, name }))
        dispatch(setPage(page))
    }

    return (
        <div>
                <SearchBar />

                <button onClick={(e) => handleonClickLoad(e)}>Load Dogs</button>

                <div>
                    {
                        dogs?.result?.length > 0 ?
                        dogs?.result?.length > 0 && dogs.result.map((el) => {
                            return <Cards image={el.image} name={el.name} temperament={el.temperament} id={el.id} key={el.id} />
                        })
                        :
                        <div>Cargando...</div>
                    }

                    <div>
                        <button disabled={page - 1 === 0} onClick={() => {handleClickPage(page - 1)}}>Back</button>
                        <label>{page}</label>
                        <button disabled={dogs?.count <= (page * 8)} onClick={() => {handleClickPage(page + 1)}}>Next</button>
                    </div>

                </div>
        </div>
    )
}

export default Home;
