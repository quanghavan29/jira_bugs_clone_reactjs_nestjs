import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Auth/Login';

import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate';
import Register from './pages/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* UserTemplate */}
        <UserTemplate exact path='/home' Component={Home}/>
        <UserTemplate exact path='/about' Component={About} />
        <UserTemplate exact path='/contact' Component={Contact} />

        {/* AuthTemplate */}
        <AuthTemplate exact path='/login' Component={Login}/>
        <AuthTemplate exact path='/register' Component={Register}/>

        <UserTemplate exact path='/' Component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
