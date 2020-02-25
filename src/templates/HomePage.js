import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHero'
import Layout from '../components/Layout'
import HeaderSection from '../components/HeaderSection'
import OurHighlights from '../components/OurHighlights'
import HomeCategories from '../components/HomeCategories'
import Welcome from '../components/Welcome'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, body }) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <HeaderSection
          hdSectionTt="Nossos Destaques"
          hdSectionSubTt="Conheça os nossos maiores Sucessos"
        />
        <OurHighlights />
      </div>
    </section>
    <section className="section section-Inverse section-Purple">
      <div className="container">
        <HeaderSection
          hdSectionTt="Nossos Produtos"
          hdSectionSubTt="Navegue em nossos produtos por categoria"
        />
        <HomeCategories />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <HeaderSection
          hdSectionTt="Bem-Vindo ao Nosso Site"
          hdSectionSubTt="Saiba mais sobre a brincadeira de criança"
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
      }
    }
  }
`
