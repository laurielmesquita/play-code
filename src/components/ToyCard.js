/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'

const ToyCard = ({
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
  <Link to={slug} className={`ToyCard ${className}`}>
    {featuredImage && (
      <div className="ToyCard--Image relative">
        <Image LazyImage src={featuredImage} alt={title} />
      </div>
    )}
    <div className="ToyCard--Content">
      {title && <h3 className="ToyCard--Title">{title}</h3>}
      <div className="ToyCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {price && <div className="ToyCard--Excerpt">{price}</div>}
    </div>
  </Link>
)

export default ToyCard
