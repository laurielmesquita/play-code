import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Image from '../components/Image'

export const SingleToyTemplate = ({
  title,
  price,
  featuredImage,
  sectionImage,
  nextPostURL,
  prevPostURL
}) => (
  <main>
    <PageHeader title={title} />
    <article className="section grid">
      <div className="container">
        <div className="SingleToy--Content relative">

          <div className="SingleToy--InnerContent">
            <div className="SingleToy--Image">
              <Image src={featuredImage} alt={title} />
            </div>
            <div className="SingleToy--Info">
              {title && (
                <h1 className="SingleToy--Title" itemProp="title">{title}</h1>
              )}
              <div className="SingleToy--Price">{price}</div>
              <Content source={sectionImage} />
            </div>
          </div>

          <div className="SingleToy--Pagination">
            {prevPostURL && (
              <Link className="SingleToy--Pagination--Link prev" to={prevPostURL}>
                Anterior
              </Link>
            )}
            {nextPostURL && (
              <Link className="SingleToy--Pagination--Link next" to={nextPostURL}>
                Próximo
              </Link>
            )}
          </div>
        </div>
        <Link className="SingleToy--BackButton" to="/toy/">
          <ChevronLeft /> Voltar para Brinquedos
        </Link>
      </div>
    </article>
  </main>
)

// Export Default SingleToy for front-end
const SingleToy = ({ data: { toy, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === toy.id)
  return (
    <Layout
      meta={toy.frontmatter.meta || false}
      title={toy.frontmatter.title || false}
    >
      <SingleToyTemplate
        {...toy}
        {...toy.frontmatter}
        body={toy.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleToy

export const pageQuery = graphql`
  query SingleToy($id: String!) {
    toy: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        price
        featuredImage
        sectionImage
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "toys" } } }
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
