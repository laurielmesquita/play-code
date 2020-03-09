import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Meta from './Meta'
import Nav from './Nav'
import NavMobile from './NavMobile'
import Footer from './Footer'

import 'modern-normalize/modern-normalize.css'
import './mainStyles.scss'

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
          allToys: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "toyCategories" } } }
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
          allTents: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "tendaCategories" } } }
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
          allClimts: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "climtCategories" } } }
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
          toys: data.allToys.hasOwnProperty('edges')
            ? data.allToys.edges.map(toy => {
              return { ...toy.node.fields, ...toy.node.frontmatter }
            })
            : false,
          tendas: data.allTents.hasOwnProperty('edges')
            ? data.allTents.edges.map(tenda => {
              return { ...tenda.node.fields, ...tenda.node.frontmatter }
            })
            : false,
          climts: data.allClimts.hasOwnProperty('edges')
            ? data.allClimts.edges.map(climt => {
              return { ...climt.node.fields, ...climt.node.frontmatter }
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
              <link href="https://ucarecdn.com" rel="preconnect" crossOrigin />
              <link rel="dns-prefetch" href="https://ucarecdn.com" />
              {/* Add font link tags here */}
            </Helmet>

            <Meta
              googleTrackingId={googleTrackingId}
              absoluteImageUrl={
                socialMediaCard &&
                socialMediaCard.image &&
                socialMediaCard.image
              }
              {...meta}
              {...data.settingsYaml}
            />

            <Nav subNav={subNav} />
            <NavMobile subNav={subNav} />

            <Fragment>{children}</Fragment>

            <Footer />
          </Fragment>
        )
      }}
    />
  )
}
