import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Image from '../components/Image'

export const SingleClimtTemplate = ({
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
        <div className="SingleClimt--Content relative">

          <div className="SingleClimt--InnerContent">
            <div className="SingleClimt--Image">
              <Image src={featuredImage} alt={title} />
            </div>
            <div className="SingleClimt--Info">
              {title && (
                <h1 className="SingleClimt--Title" itemProp="title">{title}</h1>
              )}
              <div className="SingleClimt--Price">{price}</div>
              <Content source={excerpt} />
            </div>
          </div>

          <div className="SingleClimt--Pagination">
            {prevPostURL && (
              <Link className="SingleClimt--Pagination--Link prev" to={prevPostURL}>
                Anterior
              </Link>
            )}
            {nextPostURL && (
              <Link className="SingleClimt--Pagination--Link next" to={nextPostURL}>
                Próximo
              </Link>
            )}
          </div>
        </div>
        <Link className="SingleClimt--BackButton" to="/climt/">
          <ChevronLeft /> Voltar para Brinquedos
        </Link>
      </div>
    </article>
  </main>
)

// Export Default SingleClimt for front-end
const SingleClimt = ({ data: { climt, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === climt.id)
  return (
    <Layout
      meta={climt.frontmatter.meta || false}
      title={climt.frontmatter.title || false}
    >
      <SingleClimtTemplate
        {...climt}
        {...climt.frontmatter}
        body={climt.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleClimt

export const pageQuery = graphql`
  query SingleClimt($id: String!) {
    climt: markdownRemark(id: { eq: $id }) {
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
      filter: { fields: { contentType: { eq: "climts" } } }
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
