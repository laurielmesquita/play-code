import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import ToySection from '../components/ToySection'
import ToyCategoriesNav from '../components/ToyCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter toys by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {toys} object
 */
export const byDate = toys => {
  const now = Date.now()
  return toys.filter(toy => Date.parse(toy.date) <= now)
}

/**
 * filter toys by category.
 *
 * @param {toys} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (toys, title, contentType) => {
  const isCategory = contentType === 'toyCategories'
  const byCategory = toy =>
    toy.categories &&
    toy.categories.filter(cat => cat.category === title).length
  return isCategory ? toys.filter(byCategory) : toys
}

// Export Template for use in CMS preview
export const ToyIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  price,
  toys = [],
  toyCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredToys =
        toys && !!toys.length
          ? byCategory(byDate(toys), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredToys = filteredToys.filter(toy =>
          toy.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="General">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!toyCategories.length && (
            <section className="section thin section-softPurple">
              <div className="container">
                <ToyCategoriesNav enableSearch categories={toyCategories} />
              </div>
            </section>
          )}

          {!!toys.length && (
            <section className="section grid">
              <div className="container">
                <ToySection toys={filteredToys} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default ToyIndex for front-end
const ToyIndex = ({ data: { page, toys, toyCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ToyIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      toys={toys.edges.map(toy => ({
        ...toy.node,
        ...toy.node.frontmatter,
        ...toy.node.fields
      }))}
      toyCategories={toyCategories.edges.map(toy => ({
        ...toy.node,
        ...toy.node.frontmatter,
        ...toy.node.fields
      }))}
    />
  </Layout>
)

export default ToyIndex

export const pageQuery = graphql`
  ## Query for ToyIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ToyIndex($id: String!) {
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

    toys: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "toys" } } }
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
    toyCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "toyCategories" } } }
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
