/* eslint-disable react/display-name */
import React from 'react'

export default ({ hdSectionTt, hdSectionSubTt }) => (
  <header className="hdSection">
    <h2 className="hdSection--Title">{hdSectionTt}</h2>
    <h4 className="hdSection--SubTitle">{hdSectionSubTt}</h4>
  </header>
)
