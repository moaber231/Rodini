import React from 'react'

const PageWrapper = ({ title, children }) => {
  return (
    <div className="container my-5">
      {title && (
        <div className="mb-4">
          <h1 className="h3">{title}</h1>
          <hr />
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default PageWrapper
