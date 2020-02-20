import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'

import heroImage from '../../static/products/tombo_legal.png'

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}
      <div className="container relative">
        <div className="PageHeader--Item PageHero">
          <h1 className="PageHeader--Title">{title}</h1>
          {subtitle && (
            <Content className="PageHeader--Subtitle" src={subtitle} />
          )}
          <a className="Button Button--Large" href="/toys/postagem-principal/" title="Mais informações sobre Tombo Legal">Mais Informações</a>
        </div>
        <div className="PageHeader--Item">
          <figure className="PageHeader--Image">
            <img
              src={heroImage}
              title="Tombo Legal"
              alt="Foto do brinquedo Tombo Legal"
            />
          </figure>
        </div>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
