import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Header from '../components/header/header'
import HomePage from '../components/homepage/homepage'
import About from '../components/about/about'
import Contact from '../components/contact/contact'
import Survey from '../components/survey/survey'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (localStorage.getItem('userToken') !== undefined && localStorage.getItem('userToken') !== null ? <Component {...props} /> : <Redirect to="/" />)}
    />
)

function Routes() {
  return (
    <Router>
      <div>
          <Header/>
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <PrivateRoute exact path="/survey" component={Survey} />
          </Switch>
      </div>
    </Router>
  )
}

export default Routes
