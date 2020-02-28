import React from 'react'
import { graphql } from 'gatsby'

import PageHero from '../components/PageHero'
import Layout from '../components/Layout'
import HeaderSection from '../components/HeaderSection'
import OurHighlights from '../components/OurHighlights'
import HomeCategories from '../components/HomeCategories'
import Welcome from '../components/Welcome'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  heroImage,
  heroTitle,
  heroAlt,
  hdSectionTt01,
  hdSectionSubTt01,
  hdSectionTt02,
  hdSectionSubTt02,
  hdSectionTt03,
  hdSectionSubTt03,
  body
}) => (
  <main className="Home">
    <PageHero
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
      heroImage={heroImage}
      heroTitle={heroTitle}
      heroAlt={heroAlt}
    />

    <section className="section">
      <div className="container">
        <HeaderSection
          hdSectionTt={hdSectionTt01}
          hdSectionSubTt={hdSectionSubTt01}
        />
        <OurHighlights />
      </div>
    </section>
    <section className="section section-Inverse section-Purple">
      <div className="container">
        <HeaderSection
          hdSectionTt={hdSectionTt02}
          hdSectionSubTt={hdSectionSubTt02}
        />
        <HomeCategories />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <HeaderSection
          hdSectionTt={hdSectionTt03}
          hdSectionSubTt={hdSectionSubTt03}
        />
        <Welcome />
      </div>
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        heroImage
        heroTitle
        heroAlt
        hdSectionTt01
        hdSectionSubTt01
        hdSectionTt02
        hdSectionSubTt02
        hdSectionTt03
        hdSectionSubTt03
      }
    }
  }
`
