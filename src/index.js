// const express = require('express')
// const React = require('react')
// const renderToString = require('react-dom/server').renderToString
// const Home = require('./client/components/Home').default
// ^^^ We do not need this because of webpack/babel

import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Home from './client/components/Home'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  const content = renderToString(<Home />)

  const html = `
    <html>
      <head>
        <body>
          <div id="root">${content}</div>
          <script src="bundle.js"></script>
        </body>
      </head>
    </html>
  `

  res.send(html)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})