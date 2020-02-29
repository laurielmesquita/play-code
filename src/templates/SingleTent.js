import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Image from '../components/Image'

export const SingleTentTemplate = ({
  title,
  price,
  featuredImage,
  excerpt,
  nextPostURL,
  prevPostURL
}) => (
  <main>
    <PageHeader title={title} />
    <article className="section grid">
      <div className="container">
        <div className="SingleTent--Content relative">

          <div className="SingleTent--InnerContent">
            <div className="SingleTent--Image">
              <Image src={featuredImage} alt={title} />
            </div>
            <div className="SingleTent--Info">
              {title && (
                <h1 className="SingleTent--Title" itemProp="title">{title}</h1>
              )}
              <div className="SingleTent--Price">{price}</div>
              <Content source={excerpt} />
            </div>
          </div>

          <div className="SingleTent--Pagination">
            {prevPostURL && (
              <Link className="SingleTent--Pagination--Link prev" to={prevPostURL}>
                Anterior
              </Link>
            )}
            {nextPostURL && (
              <Link className="SingleTent--Pagination--Link next" to={nextPostURL}>
                Próximo
              </Link>
            )}
          </div>
        </div>
        <Link className="SingleTent--BackButton" to="/tent/">
          <ChevronLeft /> Voltar para Brinquedos
        </Link>
      </div>
    </article>
  </main>
)

// Export Default SingleTent for front-end
const SingleTent = ({ data: { tent, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === tent.id)
  return (
    <Layout
      meta={tent.frontmatter.meta || false}
      title={tent.frontmatter.title || false}
    >
      <SingleTentTemplate
        {...tent}
        {...tent.frontmatter}
        body={tent.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleTent

export const pageQuery = graphql`
  query SingleTent($id: String!) {
    tent: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        price
        featuredImage
        excerpt
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "tents" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
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
