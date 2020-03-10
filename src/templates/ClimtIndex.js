import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import ClimtSection from '../components/ClimtSection'
import ClimtCategoriesNav from '../components/ClimtCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter climatizadores by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {climatizadores} object
 */
export const byDate = climatizadores => {
  const now = Date.now()
  return climatizadores.filter(climatizador => Date.parse(climatizador.date) <= now)
}

/**
 * filter climatizadores by category.
 *
 * @param {climatizadores} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (climatizadores, title, contentType) => {
  const isCategory = contentType === 'climatizadorCategories'
  const byCategory = climatizador =>
    climatizador.categories &&
    climatizador.categories.filter(cat => cat.category === title).length
  return isCategory ? climatizadores.filter(byCategory) : climatizadores
}

// Export Template for use in CMS preview
export const ClimtIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  price,
  climatizadores = [],
  climatizadorCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredClimts =
        climatizadores && !!climatizadores.length
          ? byCategory(byDate(climatizadores), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredClimts = filteredClimts.filter(climatizador =>
          climatizador.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="General">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!climatizadorCategories.length && (
            <section className="section pd0 section-softPurple">
              <div className="container">
                <ClimtCategoriesNav enableSearch categories={climatizadorCategories} />
              </div>
            </section>
          )}

          {!!climatizadores.length && (
            <section className="section grid">
              <div className="container">
                <ClimtSection climatizadores={filteredClimts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default ClimtIndex for front-end
const ClimtIndex = ({ data: { page, climatizadores, climatizadorCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ClimtIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      climatizadores={climatizadores.edges.map(climatizador => ({
        ...climatizador.node,
        ...climatizador.node.frontmatter,
        ...climatizador.node.fields
      }))}
      climatizadorCategories={climatizadorCategories.edges.map(climatizador => ({
        ...climatizador.node,
        ...climatizador.node.frontmatter,
        ...climatizador.node.fields
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

    climatizadores: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "climatizadores" } } }
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
    climatizadorCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "climatizadorCategories" } } }
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
