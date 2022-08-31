import './singleComic.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import xMen from '../../resources/img/x-men.png';

const SingleComic = (props) => {
    const [comics, setComics] = useState(null);
    const {getComics, error, loading} = useMarvelService();

    console.log(comics);

    useEffect(() => {
        updateComics();
    },[])

    const updateComics = () => {
            getComics()
            .then(item => setComics(item))
    }
    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error ) ? <View comics={comics}/> : null;
    console.log(comics);
    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
            <a onClick={props.setListOrSingle}href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

const View = (props) => {
    
    return (
        <>
            <img src={xMen} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
                <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">9.99$</div>
            </div>            
        </>
    )
}



export default SingleComic;