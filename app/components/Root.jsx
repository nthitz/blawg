
import React  from 'react'
import Router from 'react-router'
import Header from './Header.jsx'
import css    from '../css/base.css'

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
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <meta charSet="utf-8" />
        </head>
        <body className='p2'>
          <Header {...this.props} />
          <RouteHandler {...this.props} />
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
