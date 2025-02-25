import './App.css'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import JobsPage from './JobsPage'
import JobItemDetails from './JobItemDetails'
import NotFound from './NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
