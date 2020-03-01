import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import ClimtSection from '../components/ClimtSection'
import ClimtCategoriesNav from '../components/ClimtCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter climts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {climts} object
 */
export const byDate = climts => {
  const now = Date.now()
  return climts.filter(climt => Date.parse(climt.date) <= now)
}

/**
 * filter climts by category.
 *
 * @param {climts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (climts, title, contentType) => {
  const isCategory = contentType === 'climtCategories'
  const byCategory = climt =>
    climt.categories &&
    climt.categories.filter(cat => cat.category === title).length
  return isCategory ? climts.filter(byCategory) : climts
}

// Export Template for use in CMS preview
export const ClimtIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  price,
  climts = [],
  climtCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredClimts =
        climts && !!climts.length
          ? byCategory(byDate(climts), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredClimts = filteredClimts.filter(climt =>
          climt.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="General">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!climtCategories.length && (
            <section className="section thin section-softPurple">
              <div className="container">
                <ClimtCategoriesNav enableSearch categories={climtCategories} />
              </div>
            </section>
          )}

          {!!climts.length && (
            <section className="section grid">
              <div className="container">
                <ClimtSection climts={filteredClimts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default ClimtIndex for front-end
const ClimtIndex = ({ data: { page, climts, climtCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ClimtIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      climts={climts.edges.map(climt => ({
        ...climt.node,
        ...climt.node.frontmatter,
        ...climt.node.fields
      }))}
      climtCategories={climtCategories.edges.map(climt => ({
        ...climt.node,
        ...climt.node.frontmatter,
        ...climt.node.fields
      }))}
    />
  </Layout>
)

export default ClimtIndex

export const pageQuery = graphql`
  ## Query for ClimtIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ClimtIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage,
        price
      }
    }

    climts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "climts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
            price
          }
        }
      }
    }
    climtCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "climtCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
