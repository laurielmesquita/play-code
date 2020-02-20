/* eslint-disable react/display-name */
import React from 'react'

export default ({ hdSectionTt, hdSectionSubTt }) => (
  <header className="hdSection">
    <h1 className="hdSection--Title">{hdSectionTt}</h1>
    <h4 className="hdSection--SubTitle">{hdSectionSubTt}</h4>
  </header>
)
