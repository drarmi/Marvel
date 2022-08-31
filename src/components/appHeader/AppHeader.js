/* eslint-disable jsx-a11y/anchor-is-valid */
import './appHeader.scss';


const AppHeader = (props) => {

    return (
        <header className="app__header">
            <h1 className="app__title">                
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <input
                        onClick={props.onCharOrComics} 
                        type='button'
                        value='Characters'/>
                    </li>
                    /
                    <li>
                        <input 
                        onClick={props.onCharOrComics}
                        type='button'
                        value='Comics'/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;