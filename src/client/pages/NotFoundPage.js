import React from 'react'


//must default staticContext for browser router
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true
  return (
    <h1>Ooops, route not found.</h1>
  )
}

export default { component: NotFoundPage }