import './App.css';
import { Switch, Route, useParams } from "react-router-dom";


import Home from './Home';
import ProjectList from '../Projects/ProjectList';
import ProjectDetails from '../Projects/ProjectDetails';
import AddProjectForm from '../Projects/Forms/AddProjectForm';
import EditProjectForm from '../Projects/Forms/EditProjectForm';

function App() {
  return (
    <div className="App">
     <h1>this is the landing page (for now)</h1>
     <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/projects/:id" component={ProjectDetails} />
        <Route exact path="/projects/:id/edit" component={EditProjectForm} />
        <Route path="/projects/create" component={AddProjectForm} />
      </Switch>
    </div>
  );
}

export default App;
