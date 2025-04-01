import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Routing from './router/routing.jsx';


function App() {

    return (
        <>
            <div className="App">
                    <Router>
                        <Switch>
                            <Routing />
                        </Switch>
                    </Router>
            </div>
        </>
    )
}

export default App
