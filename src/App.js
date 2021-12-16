import './App.css';
import { Router, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Auth/Login';

import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate';
import Register from './pages/Auth/Register';
import Loading from './components/GlobalSetting/Loading/Loading';
import { history } from './util/libs/history';
import { JiraBugsTemplate } from './templates/JiraBugsTemplate/JiraBugsTemplate';
import Board from './pages/Project/Board/Board';
import ProjectSetting from './pages/Project/Settings/ProjectSetting';

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        {/* UserTemplate */}
        <UserTemplate exact path='/home' Component={Home} />
        <UserTemplate exact path='/about' Component={About} />
        <UserTemplate exact path='/contact' Component={Contact} />

        {/* AuthTemplate */}
        <AuthTemplate exact path='/login' Component={Login} />
        <AuthTemplate exact path='/register' Component={Register} />

        {/* Jira Bugs Template */}
        <JiraBugsTemplate exact path="/project/board" Component={Board} title="Kanban Board"/>
        <JiraBugsTemplate exact path="/project/settings" Component={ProjectSetting} title="Project Settings"/>

        <UserTemplate exact path='/' Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
