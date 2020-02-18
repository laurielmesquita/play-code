import React from 'react'
import { Link } from 'gatsby'

import ToySearch from './ToySearch'

import './ToyCategoriesNav.css'

const ToyCategoriesNav = ({ categories, enableSearch }) => (
  <div className="ToyCategoriesNav">
    <Link className="NavLink" exact="true" to={'/toy/'}>
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

    {enableSearch && <ToySearch />}
  </div>
)

export default ToyCategoriesNav
