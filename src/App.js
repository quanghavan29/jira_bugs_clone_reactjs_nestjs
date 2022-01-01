import './App.css';
import { Router, Switch } from 'react-router-dom';
import Login from './pages/Auth/Login';
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate';
import Register from './pages/Auth/Register';
import Loading from './components/GlobalSetting/Loading/Loading';
import { history } from './util/libs/history';
import { JiraBugsTemplate } from './templates/JiraBugsTemplate/JiraBugsTemplate';
import Board from './pages/Project/Board/Board';
import ProjectSetting from './pages/Project/Settings/ProjectSetting';
import ProjectManagement from './pages/Project/ProjectManagement/ProjectManagement';
import ViewProjectModal from './pages/Project/Modal/ViewProjectModal';
import EditProjectDrawer from './pages/Project/Drawer/EditProjectDrawer';
import CreateTaskModal from './pages/Project/Modal/CreateTaskModal';
import ViewTaskModal from './pages/Project/Modal/ViewTaskModal';
import Account from './pages/Auth/Account';

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ViewProjectModal />
      <EditProjectDrawer />
      <CreateTaskModal />
      <ViewTaskModal />

      <Switch>

        {/* AuthTemplate */}
        <AuthTemplate exact path='/login' Component={Login} />
        <AuthTemplate exact path='/register' Component={Register} />

        {/* Jira Bugs Template */}
        <JiraBugsTemplate exact path="/project/board/:id" Component={Board} title="Kanban Board" />
        <JiraBugsTemplate exact path="/project-management/settings" Component={ProjectSetting} title="Project Settings" />

        {/* Project Management */}
        <JiraBugsTemplate exact path="/project-management" Component={ProjectManagement} title="Project Management" />

        {/* Project Management */}
        <JiraBugsTemplate exact path="/account" Component={Account} title="Account" />

        <AuthTemplate path='/' Component={Login} />
        {/* <JiraBugsTemplate exact path="/" Component={Board} title="Kanban Board" /> */}
      </Switch>
    </Router>
  );
}

export default App;
