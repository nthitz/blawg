
import React  from 'react'
import Router from 'react-router'
import Header from './Header.jsx'
import css    from '../css/base.scss'

import animationManager from '../utils/animationManager.js'

let RouteHandler = Router.RouteHandler


export default class Root extends React.Component {

  constructor(props) {
      super(props)
      title: props.string
  }
  componentDidMount() {
    animationManager.startAnimation();
  }
  render () {

    let initialProps = {
      __html: safeStringify(this.props)
    }

    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'/>
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <meta charSet="utf-8" />
        </head>
        <body>
          <div className="wrapper">
            <Header {...this.props} />
            <RouteHandler {...this.props} />
          </div>
          <script
            id='initial-props'
            type='application/json'
            dangerouslySetInnerHTML={initialProps} />
          <script src='/bundle.js' />
        </body>
      </html>
    )
  }
}

function safeStringify (obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
