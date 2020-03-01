/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'

const ClimtCard = ({
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
  <Link to={slug} className={`ClimtCard ${className}`}>
    {featuredImage && (
      <div className="ClimtCard--Image relative">
        <Image LazyImage src={featuredImage} alt={title} />
      </div>
    )}
    <div className="ClimtCard--Content">
      {title && <h3 className="ClimtCard--Title">{title}</h3>}
      <div className="ClimtCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {price && <div className="ClimtCard--Excerpt">{price}</div>}
    </div>
  </Link>
)

export default ClimtCard
