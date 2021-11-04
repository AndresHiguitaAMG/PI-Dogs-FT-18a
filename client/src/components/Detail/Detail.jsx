import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import { getDogsById, removeDog } from '../../Redux/actions';


function Detail(props) {
    const { id } = props.match.params
    const { dog } = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDogsById(id))
        return () => {
            dispatch(removeDog())
        }
    }, [dispatch, id])
    

    const goToBack = () => {
        history.goBack()
    }
    return (
        <div>
            <button onClick={goToBack}>◀</button>
            {
                dog.length > 0 ? 
                <>
                <div>
                    <div>
                    <img src={dog[0].image} alt="img not found" width="400px" heigth="290px"/>
                    </div>
                    
                    <div>
                    <h2>{dog[0].name}</h2>
                    </div>

                    <div>
                        <h4>Temperaments:</h4>
                        <p>{dog[0].temperament}</p>
                    </div>

                    <div>
                        <h4>Height:</h4>
                        <p>{dog[0].height.metric}</p>
                    </div>

                    <div>
                        <h4>Weight:</h4>
                        <p>{dog[0].weight.metric}</p>
                    </div>

                    <div>
                        <h4>Years of life:</h4>
                        <p>{dog[0].life_span}</p>
                    </div>

                    
                </div>
                
                </>
                :
                <div>Loading...</div>
            }
        </div>
    )
}

export default Detail;
