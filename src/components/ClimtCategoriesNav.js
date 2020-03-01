import React from 'react'
import { Link } from 'gatsby'

import ClimtSearch from './ClimtSearch'

const ClimtCategoriesNav = ({ categories, enableSearch }) => (
  <div className="ClimtCategoriesNav">
    <Link className="NavLink" exact="true" to={'/climt/'}>
      Todos
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

    {enableSearch && <ClimtSearch />}
  </div>
)

export default ClimtCategoriesNav
