import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'

const PageHero = ({
  title,
  subtitle,
  backgroundImage,
  heroImage,
  heroTitle,
  heroAlt,
  large,
  className = ''
}) => {
  if (large) className += ' PageHero-large'
  return (
    <div className={`PageHero relative ${className}`}>
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
        <div className="PageHero--Item">
          <h1 className="PageHero--Title">{title}</h1>
          {subtitle && (
            <Content className="PageHero--Subtitle" src={subtitle} />
          )}
          <a
            className="Button Button--Large"
            href="/toys/postagem-principal/"
            title="Mais informações sobre Tombo Legal"
          >
            Mais Informações
          </a>
        </div>
        <div className="PageHero--Item">
          <figure className="PageHero--Image">
            <Image
              src={heroImage}
              title={heroTitle}
              alt={heroAlt}
            />
          </figure>
        </div>
      </div>
    </div>
  )
}

PageHero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  heroImage: PropTypes.string,
  heroTitle: PropTypes.string,
  heroAlt: PropTypes.string
}

export default PageHero
