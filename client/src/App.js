import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home.jsx'
import Details from "./components/Details/Details";
import Create from "./components/Create/Create";
import About from "./components/About/About";
import axios from "axios"

axios.defaults.baseURL = 'https://deploy-pokedex-production.up.railway.app/'

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route exact path='/pokemons'>
        <Home/>
      </Route>
      <Route exact path='/pokemons/:id'>
        <Details/>
      </Route>
      <Route exact path='/create'>
        <Create/>
        </Route> 
        <Route exact path='/about'>
        <About/>
        </Route> 
      
    </div>
  );
}

export default App;
