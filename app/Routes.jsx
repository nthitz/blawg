
import React from 'react'
import Router from 'react-router'

import Root from './components/Root.jsx'
import Index from './components/Index.jsx'
import About from './components/About.jsx'
import generatedRoutes from './generatedRoutes/_routes.jsx'

let Route = Router.Route
let DefaultRoute = Router.DefaultRoute

let Routes = (
  <Route handler={Root} path='/'>
    <Route path='/' handler={Index} />
    <Route path='/about' handler={About} />
    {generatedRoutes}
  </Route>
)
export default Routes
