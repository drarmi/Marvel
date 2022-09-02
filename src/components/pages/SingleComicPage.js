import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMassage/ErrorMassage';

import './singleComic.scss';

const SingleComicPage = () => {
    
    const {comicId} = useParams()
    const [comic, setComic] = useState(null);
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId])

    const updateComic = () => {
           clearError();
            getComics(comicId)
            .then(onComicLoaded)
            /* .catch(onError) */
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}  
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

const View = ({comic}) => {
    const{title, description, thumbnail, language, price, pageCount} = comic;
    
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>    
        </>
    )
}

export default SingleComicPage;