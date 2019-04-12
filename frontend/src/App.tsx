import React, { Component } from 'react'

import Header from './components/Header'
import Main from './pages/Main'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SeriesPage from './pages/SeriesPage'
import Signup from './pages/Signup'
import Login from './pages/LogIn'
import Profile from './pages/Profile'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Switch>
            <div>
              <Route exact path="/" component={Main} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/series/:id" component={SeriesPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
