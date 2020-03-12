import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader1 from '../components/PageHeader1'
import ToySection from '../components/ToySection'
import ToyCategoriesNav from '../components/ToyCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter brinquedos by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {brinquedos} object
 */
export const byDate = brinquedos => {
  const now = Date.now()
  return brinquedos.filter(brinquedo => Date.parse(brinquedo.date) <= now)
}

/**
 * filter brinquedos by category.
 *
 * @param {brinquedos} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (brinquedos, title, contentType) => {
  const isCategory = contentType === 'brinquedoCategories'
  const byCategory = brinquedo =>
    brinquedo.categories &&
    brinquedo.categories.filter(cat => cat.category === title).length
  return isCategory ? brinquedos.filter(byCategory) : brinquedos
}

// Export Template for use in CMS preview
export const ToyIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  price,
  brinquedos = [],
  brinquedoCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredToys =
        brinquedos && !!brinquedos.length
          ? byCategory(byDate(brinquedos), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredToys = filteredToys.filter(brinquedo =>
          brinquedo.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="General">
          <PageHeader1
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!brinquedoCategories.length && (
            <section className="section pd0 section-softPurple">
              <div className="container">
                <ToyCategoriesNav enableSearch categories={brinquedoCategories} />
              </div>
            </section>
          )}

          {!!brinquedos.length && (
            <section className="section grid">
              <div className="container">
                <ToySection brinquedos={filteredToys} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default ToyIndex for front-end
const ToyIndex = ({ data: { page, brinquedos, brinquedoCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ToyIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      brinquedos={brinquedos.edges.map(brinquedo => ({
        ...brinquedo.node,
        ...brinquedo.node.frontmatter,
        ...brinquedo.node.fields
      }))}
      brinquedoCategories={brinquedoCategories.edges.map(brinquedo => ({
        ...brinquedo.node,
        ...brinquedo.node.frontmatter,
        ...brinquedo.node.fields
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

    brinquedos: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "brinquedos" } } }
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
    brinquedoCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "brinquedoCategories" } } }
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
