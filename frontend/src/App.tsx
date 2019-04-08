import React, { Component } from 'react'

import Header from './components/Header'
import Main from './pages/Main'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SeriesPage from './pages/SeriesPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <div className="app">
            <Route exact path="/" component={Main} />
            <Route exact path="/series/:id" component={SeriesPage} />
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
