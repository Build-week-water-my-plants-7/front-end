import './App.css';
import { Route, Switch } from 'react-router-dom';
import PlantList from './components/PlantList';
import HomePage from './components/HomePage';
import EditUser from './components/EditUser';



export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/usersettings">
          <EditUser />
        </Route>
        <Route path="/myplants">
          <PlantList />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  )
}