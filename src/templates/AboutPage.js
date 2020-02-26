import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout.js'
import HeaderSection from '../components/HeaderSection'

// Export Template for use in CMS preview
export const ComponentsPageTemplate = ({ title, body }) => (
  <main>
    <PageHeader title={title} />
    <section className="section">
      <div className="container">
        <div className="About">
          <div className="About--Item">
            <HeaderSection
              hdSectionTt="Bem-vindo a Brincadeira de Criança"
              hdSectionSubTt="Sobre Nós"
            />
            <p>
              Atuamos no mercado desde 2013, prestando serviços de locação de
              brinquedos, tendas e climatizadores para qualquer tipo de evento.
            </p>
            <p>
              Através de um trabalho diferenciado e empenho de toda uma equipe
              de profissionais treinados, a{' '}
              <strong>Brincadeira de Criança</strong> é hoje uma das maiores
              empresas nesse segmento atendendo crianças, jovens e adultos de
              forma individual e personalizada.
            </p>
            <p>
              Nosso objetivo é satisfazer nossos clientes, prezando pela
              qualidade no atendimento, pontualidade, cordialidade e produtos em
              bom estado proporcionando maior segurança.
            </p>
          </div>
          <div className="About--Item">
            <div className="About--Image"></div>
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
        title
        template
        subtitle
        featuredImage
      }
    }
  }
`
