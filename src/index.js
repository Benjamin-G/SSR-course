// const express = require('express')
// const React = require('react')
// const renderToString = require('react-dom/server').renderToString
// const Home = require('./client/components/Home').default
// ^^^ We do not need this because of webpack/babel
import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'

import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app = express()

//on all calls to "/api/..." => proxy to handle cookie for Oauth
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000'
    return opts
  }
}))

app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = createStore(req)

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null 
  }).map(promise => {
    if(promise){
      return new Promise((res, rej) => {
        promise.then(res).catch(res)
      })
    }
  }) //Wrapping the inner promises with a promise that is always resolved

  //action creator and dispatch manual so when we render the site the store has data
  Promise.all(promises).then(() => {
    const context = {}
    const content = renderer(req, store, context)


    //redirects from the server if not logged in
    if(context.url){
      return res.redirect(301, context.url)
    }

    if(context.notFound) {
      res.status(404)
    }

    res.send(content)
  })
  //using .catch() would abandon the server side rendering Error Handling 1
  //could create a render functions and always render something Error Handling 1
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})