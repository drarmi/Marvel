import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

import decoration from '../../resources/img/vision.png';

const App = () => {
    const[selected, setSelected] = useState('Characters');
    
    const onCharOrComics = (event) => {
        setSelected(event.target.value)
    }
    
    return (
        <div className="app">
            <AppHeader onCharOrComics={onCharOrComics}/>
            <main>
                {selected === 'Characters' ? <CharactersList/> : <ComicsList/>}
            </main>
        </div>
    )
}
const CharactersList = () => {
    const[selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(selectedChar => id)
    }
    
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default App;