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
  <Link to={slug} className={`GeneralCard ${className}`}>
    {featuredImage && (
      <div className="GeneralCard--Image relative">
        <Image LazyImage src={featuredImage} alt={title} />
      </div>
    )}
    <div className="GeneralCard--Content">
      {title && <h3 className="GeneralCard--Title">{title}</h3>}
      <div className="GeneralCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {price && <div className="GeneralCard--Excerpt">{price}</div>}
    </div>
  </Link>
)

export default ClimtCard
