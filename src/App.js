import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';

import { LockClosedIcon } from '@heroicons/react/solid'

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