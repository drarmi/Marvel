import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {MainPage, ComicsPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
{/*                 <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                    </Routes>
                    В 6 версии Switch изменен на Routes, а компонент прописівается в нутри єлемента 
*/}
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;

