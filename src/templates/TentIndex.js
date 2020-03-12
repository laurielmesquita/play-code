import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader1 from '../components/PageHeader1'
import TentSection from '../components/TentSection'
import TentCategoriesNav from '../components/TentCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter tendas by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {tendas} object
 */
export const byDate = tendas => {
  const now = Date.now()
  return tendas.filter(tenda => Date.parse(tenda.date) <= now)
}

/**
 * filter tendas by category.
 *
 * @param {tendas} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (tendas, title, contentType) => {
  const isCategory = contentType === 'tendaCategories'
  const byCategory = tenda =>
    tenda.categories &&
    tenda.categories.filter(cat => cat.category === title).length
  return isCategory ? tendas.filter(byCategory) : tendas
}

// Export Template for use in CMS preview
export const TentIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  price,
  tendas = [],
  tendaCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredTents =
        tendas && !!tendas.length
          ? byCategory(byDate(tendas), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredTents = filteredTents.filter(tenda =>
          tenda.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="General">
          <PageHeader1
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!tendaCategories.length && (
            <section className="section pd0 section-softPurple">
              <div className="container">
                <TentCategoriesNav enableSearch categories={tendaCategories} />
              </div>
            </section>
          )}

          {!!tendas.length && (
            <section className="section grid">
              <div className="container">
                <TentSection tendas={filteredTents} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default TentIndex for front-end
const TentIndex = ({ data: { page, tendas, tendaCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <TentIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      tendas={tendas.edges.map(tenda => ({
        ...tenda.node,
        ...tenda.node.frontmatter,
        ...tenda.node.fields
      }))}
      tendaCategories={tendaCategories.edges.map(tenda => ({
        ...tenda.node,
        ...tenda.node.frontmatter,
        ...tenda.node.fields
      }))}
    />
  </Layout>
)

export default TentIndex

export const pageQuery = graphql`
  ## Query for TentIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query TentIndex($id: String!) {
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

    tendas: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "tendas" } } }
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
    tendaCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "tendaCategories" } } }
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
