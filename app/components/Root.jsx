
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
          <link href='https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,700' rel='stylesheet' type='text/css'/>
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=420, initial-scale=0.761904762" />
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
