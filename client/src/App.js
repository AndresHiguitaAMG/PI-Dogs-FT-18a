import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';


function App() {
  return (
  <Router>
    <div className="App"> 
    {/* <Switch> */}
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={NavBar} />
      <Route exact path="/home" component={Home} />
      <Route path="/detail" component={NavBar} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/home/create" component={Form} />
      {/* </Switch> */}
    </div>
    </Router>
  );
}

export default App;
