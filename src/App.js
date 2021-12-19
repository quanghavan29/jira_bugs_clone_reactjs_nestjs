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

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ViewProjectModal />
      <EditProjectDrawer />

      <Switch>

        {/* AuthTemplate */}
        <AuthTemplate exact path='/login' Component={Login} />
        <AuthTemplate exact path='/register' Component={Register} />

        {/* Jira Bugs Template */}
        <JiraBugsTemplate exact path="/project/board" Component={Board} title="Kanban Board" />
        <JiraBugsTemplate exact path="/project-management/settings" Component={ProjectSetting} title="Project Settings" />

        {/* Project Management */}
        <JiraBugsTemplate exact path="/project-management" Component={ProjectManagement} title="Project Management" />

        <JiraBugsTemplate exact path="/" Component={Board} title="Kanban Board" />
      </Switch>
    </Router>
  );
}

export default App;
