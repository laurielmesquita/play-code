import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Meta from './Meta'
import Nav from './Nav'

import 'modern-normalize/modern-normalize.css'

export default ({ children, meta, title }) => {
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            googleTrackingId
            socialMediaCard {
              image
            }
          }
          allPosts: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "postCategories" } } }
            sort: { order: DESC, fields: [frontmatter___date] }
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
      `}
      render={data => {
        const { siteTitle, socialMediaCard, googleTrackingId } =
          data.settingsYaml || {}
        const subNav = {
          posts: data.allPosts.hasOwnProperty('edges') ? data.allPosts.edges.map(post => {
            return { ...post.node.fields, ...post.node.frontmatter }
          })
            : false
        }

        return (
          <Fragment>
            <Helmet
              defaultTitle={siteTitle}
              titleTemplate={`%s | ${siteTitle}`}
            >
              {title}
              <link href="https://brincadeira.co" rel="preconnect" crossOrigin />
              <link rel="dns-prefetch" href="https://brincadeira.co" />
              {/* Add font link tags here */}
            </Helmet>

            <Meta
              googleTrackingId={googleTrackingId}
              absoluteImageUrl={ socialMediaCard && socialMediaCard.image && socialMediaCard.image }
              { ...meta }
              { ...data.settingsYaml }
            />

            <Nav subNav={subNav} />

            <Fragment>{children}</Fragment>
          </Fragment>
        )
      }}
    />
  )
}
