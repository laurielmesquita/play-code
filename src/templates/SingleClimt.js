import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft, ChevronRight } from 'react-feather'

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
    <PageHeader
      title={[
        <a key="BackToIndex" href="/climatizador/">
          <ChevronLeft /> Todos os Climatizadores
        </a>
      ]}
    />
    <article className="section grid">
      <div className="container">
        <div className="SingleGeneral--Content relative">
          <div className="SingleGeneral--InnerContent">
            <div className="SingleGeneral--Image">
              <Image src={featuredImage} alt={title} />
            </div>
            <div className="SingleGeneral--Info">
              {title && (
                <h1 className="SingleGeneral--Title" itemProp="title">
                  {title}
                </h1>
              )}
              <div className="SingleGeneral--Price">{price}</div>
              <Content source={excerpt} />
            </div>
          </div>
          <div className="SingleGeneral--Pagination">
            {prevPostURL && (
              <Link
                className="SingleGeneral--Pagination--Link prev"
                to={prevPostURL}
              >
                <ChevronLeft /> Anterior
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SingleGeneral--Pagination--Link next"
                to={nextPostURL}
              >
                Próximo <ChevronRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SingleClimt for front-end
const SingleClimt = ({ data: { climatizador, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === climatizador.id)
  return (
    <Layout
      meta={climatizador.frontmatter.meta || false}
      title={climatizador.frontmatter.title || false}
    >
      <SingleClimtTemplate
        {...climatizador}
        {...climatizador.frontmatter}
        body={climatizador.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleClimt

export const pageQuery = graphql`
  query SingleClimt($id: String!) {
    climatizador: markdownRemark(id: { eq: $id }) {
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
      filter: { fields: { contentType: { eq: "climatizadores" } } }
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
