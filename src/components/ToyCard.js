/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'

const ToyCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`ToyCard ${className}`}>
    {featuredImage && (
      <div className="ToyCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="ToyCard--Content">
      {title && <h3 className="ToyCard--Title">{title}</h3>}
      <div className="ToyCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {excerpt && <div className="ToyCard--Excerpt">{excerpt}</div>}
    </div>
  </Link>
)

export default ToyCard
