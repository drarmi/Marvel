import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import SingleComic from '../singleComic/SingleComic';

const ComicsList = () => {
    const [triger, setTriger] = useState(true)
    
    const setListOrSingle = () =>{
        setTriger(!triger)
    }
    return(
        <>
           {triger ? <Comics setListOrSingle={setListOrSingle}/> : <SingleComic setListOrSingle={setListOrSingle}/>}
        </>
    )
}

const Comics = (props) => {

    const[comicsList, setComicsList] = useState([]);
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[offset, setOffset] = useState(210);
    const[comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} =useMarvelService()

    useEffect(() =>{
        onRequest(offset, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (offset, initial) => {
    initial ? onCharListLoading(false) : onCharListLoading(true);
        getAllComics()
        .then(onComicsListLoaded)
    }

    const onCharListLoading = (boolean) => {
        setNewItemLoading( newItemLoading => boolean)      
    }

    
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading( false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr) {
        const items =  arr.map((item) => {
            
            return (
                <li className="comics__item"
                onClick={props.setListOrSingle}
                key={item.id}>   
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">`${item.price}$`</div>
                    </a>
                </li>

            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    
    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )    
}

export default ComicsList;