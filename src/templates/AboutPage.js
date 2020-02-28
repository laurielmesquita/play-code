import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import HeaderSection from '../components/HeaderSection'
import Content from '../components/Content'
import Layout from '../components/Layout.js'
import Image from '../components/Image'

// Export Template for use in CMS preview
export const ComponentsPageTemplate = ({
  featuredImage,
  hdSectionTt,
  hdSectionSubTt,
  title,
  section1,
  body
}) => (
  <main>
    <PageHeader title={title} />
    <section className="section">
      <div className="container">
        <div className="About">
          <div className="About--Item">
            <HeaderSection
              hdSectionTt={hdSectionTt}
              hdSectionSubTt={hdSectionSubTt}
            />
            <Content source={section1} />
          </div>
          <div className="About--Item">
            <div className="About--Image relative">
              <Image background src={featuredImage} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

const ComponentsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ComponentsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ComponentsPage

export const pageQuery = graphql`
  query ComponentsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        featuredImage
        hdSectionTt
        hdSectionSubTt
        title
        section1
        template
        subtitle
        featuredImage
      }
    }
  }
`
