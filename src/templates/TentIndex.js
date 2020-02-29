import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import TentSection from '../components/TentSection'
import TentCategoriesNav from '../components/TentCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter tents by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {tents} object
 */
export const byDate = tents => {
  const now = Date.now()
  return tents.filter(tent => Date.parse(tent.date) <= now)
}

/**
 * filter tents by category.
 *
 * @param {tents} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (tents, title, contentType) => {
  const isCategory = contentType === 'tentCategories'
  const byCategory = tent =>
    tent.categories &&
    tent.categories.filter(cat => cat.category === title).length
  return isCategory ? tents.filter(byCategory) : tents
}

// Export Template for use in CMS preview
export const TentIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  price,
  tents = [],
  tentCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredTents =
        tents && !!tents.length
          ? byCategory(byDate(tents), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredTents = filteredTents.filter(tent =>
          tent.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Blog">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!tentCategories.length && (
            <section className="section thin section-softPurple">
              <div className="container">
                <TentCategoriesNav enableSearch categories={tentCategories} />
              </div>
            </section>
          )}

          {!!tents.length && (
            <section className="section grid">
              <div className="container">
                <TentSection tents={filteredTents} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default TentIndex for front-end
const TentIndex = ({ data: { page, tents, tentCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <TentIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      tents={tents.edges.map(tent => ({
        ...tent.node,
        ...tent.node.frontmatter,
        ...tent.node.fields
      }))}
      tentCategories={tentCategories.edges.map(tent => ({
        ...tent.node,
        ...tent.node.frontmatter,
        ...tent.node.fields
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

    tents: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "tents" } } }
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
    tentCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "tentCategories" } } }
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
