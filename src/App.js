import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import QuizGameRoute from './components/QuizGameRoute'
import GameResultsRoute from './components/GameResultsRoute'
import GameReportsRoute from './components/GameReportsRoute'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/quiz-game" component={QuizGameRoute} />
        <ProtectedRoute
          exact
          path="/game-results"
          component={GameResultsRoute}
        />
        <ProtectedRoute
          exact
          path="/game-report"
          component={GameReportsRoute}
        />
        <Route exact path="/bad-path" component={NotFoundRoute} />
        <Redirect to="/bad-path" />
      </Switch>
    )
  }
}

export default App
