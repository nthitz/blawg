
import React from 'react'
import Router from 'react-router'

let Route = Router.Route
let DefaultRoute = Router.DefaultRoute

import Root from './components/Root.jsx'
import Index from './components/Index.jsx'
import About from './components/About.jsx'

import generatedRoutes from './generatedRoutes.jsx'

let Routes = (
  <Route handler={Root} path='/'>
    <Route path='/' handler={Index} />
    <Route path='/about' handler={About} />
    {generatedRoutes}
  </Route>
)
export default Routes
