import React from 'react'
import PropTypes from 'prop-types'

const PageHeader = ({
  title,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      <div className="container relative">
        <h2 className="PageHeader--Title">{title}</h2>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
