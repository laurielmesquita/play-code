import React from 'react'
import PropTypes from 'prop-types'

const PageHeader1 = ({
  title,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      <div className="container relative">
        <h1 className="PageHeader--Title">{title}</h1>
      </div>
    </div>
  )
}

PageHeader1.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader1
