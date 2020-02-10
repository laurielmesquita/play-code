import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Marked from 'react-markdown'
import PropTypes from 'prop-types'

const encodeMarkdownURIs = (source = '') => {
  const markdownLinkRegex = /\[(.+)\]\((.+)(".+)\)/g
  console.log(source)
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

const withContentImages = source => {
  const images = source.match(/<img(.*?)\\?>/gim)

  for (const i in images) {
    const src = /src="(.*?)"/g.exec(images[i])
    const alt = /alt="(.*?)"/g.exec(images[i])
    const title = /title="(.*?)"/g.exec(images[i])
    source = source.replace(
      images[i],
      ReactDOMServer.renderToStaticMarkup(
        <Image
          resolution="medium"
          className="Content--Image"
          lazy={false}
          src={src ? src[1] : null}
          alt={alt ? alt[1] : null}
          title={title ? title[1] : null}
        />
      )
    )
  }

  return source
}

const MyImage = ({ nodeKey, src, title, alt }) => {
  const decodeSrc = decodeURI(src)
  return (
    <Image
      className="Content-Image markdown-preview"
      resolution="medium"
      lazy={false}
      src={decodeSrc}
      alt={alt}
      title={title}
    />
  )
}

const HtmlBlock = ({ value }) => {
  if (value.indexOf('<iframe') !== 0) return value
  return (
    <div
      className={'Content--Iframe'}
      dangerouslySetInnerHTML={{
        __html: value
      }}
    />
  )
}

const Content = ({ source, src, className = '' }) => {
  source = source || src || ''
  if (source.match(/^</)) {
    source = withContentImages(source)

    return (
      <div
        className={`Content ${className}`}
        dangerouslySetInnerHTML={{ __html: source }}
      />
    )
  }

  return (
    <Marked
      className={`Content ${className}`}
      source={encodeMarkdownURIs(source)}
      renders={{
        image: MyImage,
        html: HtmlBlock
      }}
    />
  )
}

Content.propTypes = {
  source: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string
}

export default Content
