/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'

const TentCard = ({
  featuredImage,
  price,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  lazy = true,
  ...props
}) => (
  <Link to={slug} className={`TentCard ${className}`}>
    {featuredImage && (
      <div className="TentCard--Image relative">
        <Image LazyImage src={featuredImage} alt={title} />
      </div>
    )}
    <div className="TentCard--Content">
      {title && <h3 className="TentCard--Title">{title}</h3>}
      <div className="TentCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {price && <div className="TentCard--Excerpt">{price}</div>}
    </div>
  </Link>
)

export default TentCard
