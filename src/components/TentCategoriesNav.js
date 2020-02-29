import React from 'react'
import { Link } from 'gatsby'

import TentSearch from './TentSearch'

const TentCategoriesNav = ({ categories, enableSearch }) => (
  <div className="TentCategoriesNav">
    <Link className="NavLink" exact="true" to={'/tent/'}>
      Todas
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <TentSearch />}
  </div>
)

export default TentCategoriesNav
