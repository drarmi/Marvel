import { useEffect, useState, useRef } from 'react';
import useMarvelServices from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import PropTypes from 'prop-types';
import './charList.scss';

const CharList = (props) => {

    const[charList, setCharList] = useState([]);
    /* const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false); */
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[offset, setOffset] = useState(210);
    const[charEnded, setCharEnded] = useState(false);
   
    /* const marvelService =new useMarvelServices(); */
    const {loading, error, getAllCharacters} = useMarvelServices();

    useEffect(() =>{
        onRequest(offset, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (offset, initial) => {
/*         onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError) */
            initial ? onCharListLoading(false) : onCharListLoading(true);
            getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoading = (boolean) => {
        setNewItemLoading( newItemLoading => boolean)      
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        
        setCharList(charList => [...charList, ...newCharList]);
/*         setLoading(loading => false); */
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

/*     const onError = () => {
            setError(error => true);
            setLoading(loading => false);
    } */

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        // Я реализовал  вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    /* const content = !(loading || error) ? items : null; */

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {/* {content} */}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;