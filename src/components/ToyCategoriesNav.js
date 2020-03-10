import React from 'react'
import { Link } from 'gatsby'

import GeneralSearch from './GeneralSearch'

const ToyCategoriesNav = ({ categories, enableSearch }) => (
  <div className="GeneralCategoriesNav">
    <Link className="NavLink" exact="true" to={'/brinquedo/'}>
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

    {enableSearch && <GeneralSearch />}
  </div>
)

export default ToyCategoriesNav
